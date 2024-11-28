import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  role: string | null = '';

  constructor(private authService: AuthService, private router: Router) {
    this.role = localStorage.getItem('selectedRole') || '';
    console.log("Role selected: ", this.role);
  }

  onLogin(): void {
    if (this.role === 'admin') {
      this.authService.loginAdmin(this.username, this.password).subscribe({
        next: (response) => {
          console.log('Admin Login Successful', response);
          
          Swal.fire({
            icon: 'success',
            title: 'Admin Login Successful!',
            text: 'Welcome to the Admin Dashboard.',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            this.router.navigate(['/admin']);
          });
        },
        error: (err) => {
          console.error('Admin login failed', err);
          Swal.fire({
            icon: 'error',
            title: 'Login Failed!',
            text: 'Invalid username or password.',
            confirmButtonText: 'Try Again'
          });
        }
      });
    } else if (this.role === 'user') {
      this.authService.loginUser(this.username, this.password).subscribe({
        next: (response) => {
          console.log('User Login Successful', response);
          Swal.fire({
            icon: 'success',
            title: 'User Login Successful!',
            text: 'Welcome to your dashboard.',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            this.router.navigate(['/user/home']);
          });
        },
        error: (err) => {
          console.error('User login failed', err);
          Swal.fire({
            icon: 'error',
            title: 'Login Failed!',
            text: 'Invalid username or password.',
            confirmButtonText: 'Try Again'
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Role Not Selected!',
        text: 'Please select a valid role before logging in.',
        confirmButtonText: 'OK'
      });
    }
  }

  goBack() {
    this.router.navigate(['/welcome']);
  }
}
