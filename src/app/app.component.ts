import { Component } from '@angular/core';
import { LoanCalculatorComponent } from './components/loan-calculator/loan-calculator.component';

@Component({
  selector: 'app-root',
  imports: [LoanCalculatorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'loan-amortization-schedule';
}
