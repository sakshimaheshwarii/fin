import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  newPassword: string = '';
  confirmPassword: string = '';
  passwordMismatch: boolean = false;

  constructor(private router: Router, private toastr:ToastrService) {}

  onResetPassword() {
    if (this.passwordsMismatch()) {
      this.passwordMismatch = true;
      return;
    }

    // Simulate password reset (replace with real API call)
    this.toastr.success('Password has been successfully reset!');
    this.router.navigate(['/reset-password']); // Redirect to login after reset
  }

  passwordsMismatch(): boolean {
    return this.newPassword !== this.confirmPassword;
  }
}
