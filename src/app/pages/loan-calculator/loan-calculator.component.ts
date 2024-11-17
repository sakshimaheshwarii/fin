import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

interface EMISchedule {
  month: number;
  principal: number;
  interest: number;
  total: number;
  remaining: number;
  paid: boolean;
}

@Component({
  selector: 'app-loan-calculator',
  templateUrl: './loan-calculator.component.html',
  styleUrls: ['./loan-calculator.component.css'],
})
export class LoanCalculatorComponent {
  amount!: number;
  rate!: number;
  term!: number;
  frequency: string = 'monthly'; // Default payment frequency
  emi: number | null = null;
  showSchedule: boolean = false;
  schedule: EMISchedule[] = [];
  displayedColumns: string[] = [
    'month',
    'principal',
    'interest',
    'total',
    'remaining',
    'paid',
  ];

  constructor(private router: Router, private location: Location, private toastr:ToastrService) {}

  calculateEMI() {
    if (!this.amount || !this.rate || !this.term) {
      this.toastr.warning('Please fill in all fields before calculating EMI.');
      return;
    }

    const interestRate = this.rate / 100;
    let adjustedTerm = this.term;
    let adjustedRate = interestRate;

    // Adjust rate and term based on payment frequency
    switch (this.frequency) {
      case 'quarterly':
        adjustedTerm = Math.ceil(this.term / 3);
        adjustedRate = Math.pow(1 + interestRate, 1 / 4) - 1;
        break;
      case 'half-yearly':
        adjustedTerm = Math.ceil(this.term / 6);
        adjustedRate = Math.pow(1 + interestRate, 1 / 2) - 1;
        break;
      case 'yearly':
        adjustedTerm = Math.ceil(this.term / 12);
        adjustedRate = interestRate;
        break;
    }

    const emiRate = adjustedRate / 12;
    this.emi =
      (this.amount *
        emiRate *
        Math.pow(1 + emiRate, adjustedTerm)) /
      (Math.pow(1 + emiRate, adjustedTerm) - 1);

    this.generateSchedule(adjustedTerm, emiRate);
  }

  generateSchedule(term: number, rate: number) {
    this.schedule = [];
    let balance = this.amount;

    for (let i = 1; i <= term; i++) {
      const interest = balance * rate;
      const principal = this.emi! - interest;
      balance -= principal;

      this.schedule.push({
        month: i,
        principal: principal,
        interest: interest,
        total: this.emi!,
        remaining: Math.max(balance, 0), // Remaining balance
        paid: false, // Payment status
      });
    }
  }

  togglePaidStatus(index: number) {
    this.schedule[index].paid = !this.schedule[index].paid;
  }

  goBack(): void {
    // Navigate safely using Angular router
    this.location.back();
  }
}
