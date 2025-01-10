import { Injectable } from '@angular/core';

export interface ScheduleEntry {
  date: string;
  remainingDebt: number;
  interest: number;
  repayment: number;
  rate: number;
}

@Injectable({
  providedIn: 'root',
})
export class LoanScheduleService {
  calculateSchedule(
    loanAmount: number,
    interestRate: number,
    initialRepayment: number,
    fixedInterestYears: number
  ): ScheduleEntry[] {
    const entries: ScheduleEntry[] = [];
    const monthlyInterestRate = interestRate / 100 / 12;
    const monthlyRepayment = (initialRepayment / 100) * loanAmount / 12;
    const monthlyRate = loanAmount * monthlyInterestRate + monthlyRepayment;
    let remainingDebt = loanAmount;

    const startDate = new Date();
    startDate.setDate(30); // Zahlungen am Monatsende

    // Erste Zeile: Auszahlung
    entries.push({
      date: startDate.toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' }),
      remainingDebt: -loanAmount,
      interest: 0,
      repayment: -loanAmount,
      rate: -loanAmount,
    });

    // Iteriere für die gesamte Zinsbindungsdauer (in Monaten)
    for (let month = 1; month <= fixedInterestYears * 12; month++) {
      const interest = remainingDebt * monthlyInterestRate; // Zinsen für den Monat
      const repayment = monthlyRate - interest; // Tilgungsanteil
      remainingDebt -= repayment; // Restschuld berechnen

      // Setze Datum für die aktuelle Zahlung
      const paymentDate = new Date(startDate);
      paymentDate.setMonth(startDate.getMonth() + month);

      // Füge die Daten zum Tilgungsplan hinzu
      entries.push({
        date: paymentDate.toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' }),
        remainingDebt: Math.max(remainingDebt, 0), // Restschuld kann nicht negativ sein
        interest: interest,
        repayment: repayment,
        rate: monthlyRate,
      });
      
      // Abbruch, falls die Restschuld getilgt ist
      if (remainingDebt <= 0) break; 
    }

    return entries;
  }
}