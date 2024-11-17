import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('titleAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-30px)' }),
        animate('0.8s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('subtitleAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('0.8s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.8s 0.3s ease-out', style({ opacity: 1 }))
      ])
    ]),
    trigger('buttonAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('0.5s 0.5s ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class WelcomeComponent implements OnInit {
  isDarkMode = false;
  hoveredButton = '';
  service: any = {}; // Initialize the service object to avoid undefined error
  constructor(private dialog: MatDialog, private router: Router, private toastr:ToastrService) {}

  ngOnInit() {
    // Check system preference for dark mode
    this.isDarkMode = window.matchMedia('(prefers-color-scheme: light)').matches;

    // Get saved role from localStorage
    const savedRole = localStorage.getItem('selectedRole');
    if (savedRole) {
      this.service.role = savedRole; // Set the role from localStorage
    } else {
      console.log("No role found in localStorage");
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  }

  selectRole(role: string): void {
    console.log(`Selected role: ${role}`);
    this.toastr.info(`${role} selected`);
    this.service.role = role; // Assign the selected role
    localStorage.setItem('selectedRole', role); // Save the role in localStorage
    this.router.navigate(['/role']); // Navigate to the next page
  }


  showWhatsNew() {
    // Implement dialog showing new features
    // You'll need to create a separate component for this dialog
  }
}
