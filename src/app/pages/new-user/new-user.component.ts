import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class RegisterComponent {
  user = {
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  confirmPasswordMismatch = false;
  role: string | null = '';


  constructor(private authService: AuthService, private router: Router) {
    // this.role = this.authService.role;
    console.log("role: ", this.role);

  }

  onRegister(registerForm: NgForm): void {
    if (this.user.password !== this.user.confirmPassword) {
      this.confirmPasswordMismatch = true;
      return;
    }
    this.confirmPasswordMismatch = false;

    if (localStorage.getItem('selectedRole') === 'admin') {
      this.authService.registerAdmin(this.user.name, this.user.username, this.user.email, this.user.password).subscribe({
        next: (response) => {
          console.log('Admin registered successfully', response);
          this.router.navigate(['/admin']); // Adjust the route if necessary
        },
        error: (err) => {
          console.error('Admin registration failed', err);
          // Display an error message to the user if needed
        }
      });
    } else if (localStorage.getItem('selectedRole') === 'user') {
      this.authService.registerUser(this.user.name, this.user.username, this.user.email, this.user.password).subscribe({
        next: (response) => {
          console.log('User registered successfully', response);
          this.router.navigate(['/user/home']); // Adjust the route if necessary
        },
        error: (err) => {
          console.error('User registration failed', err);
          // Display an error message to the user if needed
        }
      });
    } else {
      console.warn('Role is not defined or invalid:', localStorage.getItem('selectedRole'));
    }

  }

  goBack() {
    this.router.navigate(['/welcome']);
  }
}
