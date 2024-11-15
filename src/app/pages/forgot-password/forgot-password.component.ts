import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';
  isSubmitting: boolean = false;
  message: string = '';


  constructor(private router: Router, private http: HttpClient) {}

  onSubmit(form: any) {
    if (form.valid) {
      this.isSubmitting = true;
      const email = form.value.email;

      // Send the password reset request to the backend
      this.http.post(`http://localhost:8087/api/auth/request-password-reset`, { email })
        .subscribe(
          (response: any) => {
            console.log('Password reset link sent:', response);
            this.message = 'If this email is registered, a reset link will be sent.';
            this.router.navigate(['/login']);
          },
          (error: any) => {
            console.error('Error sending password reset link:', error);
            this.message = 'An error occurred. Please try again.';
          },
          () => {
            this.isSubmitting = false;
          }
        );
    }
  }

  goBackToLogin() {
    this.router.navigate(['/login']);
  }


  getMessageClass() {
    return {
      'error': this.message.includes('error') // or however you determine error state
    };
  }
}