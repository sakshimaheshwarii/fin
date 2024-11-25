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
  service: any = {};
  constructor(private dialog: MatDialog, private router: Router, private toastr:ToastrService) {}

  ngOnInit() {
    this.isDarkMode = window.matchMedia('(prefers-color-scheme: light)').matches;

    const savedRole = localStorage.getItem('selectedRole');
    if (savedRole) {
      this.service.role = savedRole; 
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
    this.service.role = role;
    localStorage.setItem('selectedRole', role);
    this.router.navigate(['/role']);
  }


  showWhatsNew() {
    this.toastr.info("few changes are expected in future");
  }
}
