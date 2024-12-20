import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-loan-application',
  templateUrl: './loan-application.component.html',
  styleUrls: ['./loan-application.component.css']
})
export class LoanApplicationComponent {
  collateralDocument: File | null = null;
  captchaQuestion: string = '';
  correctCaptchaAnswer: number = 0;
  userCaptchaAnswer!: number;
  captchaError: boolean = false;

  loanId: string | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private location: Location, private http: HttpClient, private toastr:ToastrService) {
    this.generateCaptcha();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      if (file.size > 10 * 1024 * 1024) { 
        this.toastr.info('File size exceeds the 10MB limit.');
        return;
      }
      this.collateralDocument = file;
    }
  }

  goBack(): void {
    this.location.back();
  }

  generateCaptcha(): void {
    const operations = ['+', '-', '*'];
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * num1);
    const operation = operations[Math.floor(Math.random() * operations.length)];

    switch (operation) {
      case '+':
        this.correctCaptchaAnswer = num1 + num2;
        break;
      case '-':
        this.correctCaptchaAnswer = num1 - num2;
        break;
      case '*':
        this.correctCaptchaAnswer = num1 * num2;
        break;
    }
    this.captchaQuestion = `${num1} ${operation} ${num2} = ?`;
  }

  submitLoanApplication(form: NgForm): void {
    this.successMessage = null;
    this.errorMessage = null;
    this.loanId = null;

    if (this.userCaptchaAnswer !== this.correctCaptchaAnswer) {
      this.captchaError = true;
      return;
    }
    this.captchaError = false;

    if (form.valid && this.collateralDocument) {
      const formData = new FormData();
      formData.append('collateral', this.collateralDocument);
      formData.append('amount', form.value.amount);
      formData.append('term', form.value.term);
      formData.append('type', form.value.type);
      formData.append('address', form.value.address);

      this.http.post<LoanApplicationResponse>('http://localhost:8087/api/loan-applications/submit', formData)
        .subscribe({
          next: (response) => {
            this.successMessage = response.message;
            this.toastr.success("Loan Application Request Sent")
            this.loanId = response.loanId;
            this.clearForm(form);
          },
          error: (error: HttpErrorResponse) => {
            this.errorMessage = error.error.error || 'Failed to submit the application';
            console.error('Error:', error);
          }
        });
    } else {
      this.toastr.warning('Please fill out the form correctly.');
    }
  }

  clearForm(form: NgForm): void {
    form.resetForm();
    this.collateralDocument = null;
    this.userCaptchaAnswer = 0;
    this.generateCaptcha();
  }
}

interface LoanApplicationResponse {
  loanId: string;
  message: string;
}

interface ErrorResponse {
  error: string;
}
