import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  isRegistered: boolean = false;
  isDarkMode: boolean = false;
  isNavbarCollapsed: boolean = true;

  constructor(private authService: AuthService, public router: Router) {}

  ngOnInit() {
    this.authService.getLoginStatus().subscribe((status: boolean) => {
      console.log('login status ping: ', status);
      this.isLoggedIn = status;
    });

    this.authService.getRegistrationStatus().subscribe((status: boolean) => {
      console.log('reg status ping: ',  status);
      this.isRegistered = status;
    });

    const savedMode = localStorage.getItem('darkMode') === 'true';
    this.isDarkMode = savedMode;
    this.updateBodyClass();


    setInterval(() => {
      console.log('isLoggedIn: ', this.isLoggedIn);
      console.log('isRegistered: ', this.isRegistered);
    }, 1000);
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode.toString());
    this.updateBodyClass();
  }

  private updateBodyClass() {
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }

  navigateHome() {
    if (this.isLoggedIn) {
      const role = this.authService.getRole();
      if (role === 'admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    } else {
      this.router.navigate(['/welcome']);
    }
  }


  navigateToLogin() {
    this.router.navigate(['/welcome']);
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.isRegistered = false;
    this.router.navigate(['/logout']);
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

@HostListener('window:scroll', ['$event'])
onWindowScroll() {
  const navbar = document.querySelector('.navbar');
  if (window.pageYOffset > 50) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }
}
}
