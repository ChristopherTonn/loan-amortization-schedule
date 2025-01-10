import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoanScheduleService, ScheduleEntry } from '../../services/loan-schedule.service';


@Component({
  selector: 'app-loan-calculator',
  imports: [CommonModule, FormsModule],
  templateUrl: './loan-calculator.component.html',
  styleUrl: './loan-calculator.component.css'
})
export class LoanCalculatorComponent {
  loanAmount = 100000;
  interestRate = 2.12;
  initialRepayment = 2;
  fixedInterestYears = 10;

  schedule: ScheduleEntry[] = [];

  constructor(private loanScheduleService: LoanScheduleService) {}

  calculateLoanSchedule() {
    this.schedule = this.loanScheduleService.calculateSchedule(
      this.loanAmount,
      this.interestRate,
      this.initialRepayment,
      this.fixedInterestYears
    );
  }
}
