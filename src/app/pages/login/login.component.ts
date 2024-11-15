import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  role: string | null = '';  // Set default as null for validation

  constructor(private authService: AuthService, private router: Router) {
    // Retrieve the role from localStorage or set a default
    this.role = localStorage.getItem('selectedRole') || '';
    console.log("Role selected: ", this.role);
  }

  onLogin(): void {
    if (this.role === 'admin') {
      // Admin login
      this.authService.loginAdmin(this.username, this.password).subscribe({
        next: (response) => {
          console.log('Admin login successful', response);
          this.router.navigate(['/admin']); // Navigate to the admin dashboard
        },
        error: (err) => {
          console.error('Admin login failed', err);
        }
      });
    } else if (this.role === 'user') {
      // User login
      this.authService.loginUser(this.username, this.password).subscribe({
        next: (response) => {
          console.log('User login successful', response);
          this.router.navigate(['/user/home']); // Navigate to the user dashboard
        },
        error: (err) => {
          console.error('User login failed', err);
        }
      });
    } else {
      console.error('Role is undefined or invalid');
    }
  }

  goBack() {
    this.router.navigate(['/welcome']); // Navigate back to the welcome page
  }
}
