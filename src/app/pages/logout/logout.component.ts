// logout.component.ts
import { Component, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  @ViewChild('feedbackDialog') feedbackDialog!: TemplateRef<any>;
  rating: number = 0;
  feedback: string = '';
  submitted: boolean = false;
  stars: boolean[] = Array(5).fill(false); // Array for star rating


  constructor(private dialog: MatDialog, private router: Router, private toastr:ToastrService) {}

  confirmLogout() {
    const confirmation = confirm('Are you sure you want to log out?');
    if (confirmation) {
      this.openFeedbackDialog();
    } else {
      this.goToHome();
    }
  }

  openFeedbackDialog() {
    this.dialog.open(this.feedbackDialog);
  }

  rate(star: number) {
    this.rating = star;
    this.stars.fill(false);
    for (let i = 0; i < star; i++) {
      this.stars[i] = true;
    }
  }

  submitFeedback() {
    console.log('Rating:', this.rating);
    console.log('Feedback:', this.feedback);
    this.submitted = true;
    this.toastr.success("You are Sucessfully logged out")
    this.closeDialog();
  }

  closeDialog() {
    this.dialog.closeAll(); // Close the dialog
  }

  goToWelcome() {
    this.router.navigate(['/welcome']); // Redirect to welcome page
  }

  goToHome() {
    this.router.navigate(['/user/home']); // Redirect to home page
  }
}
