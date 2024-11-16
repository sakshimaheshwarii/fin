import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ResolveX: Loan Origination System';
  loading: boolean = true; // Start with loading true

  // Simulate loading (e.g., when the app initializes)
  constructor() {
    setTimeout(() => {
      this.loading = false; // Hide preloader after 3 seconds
    }, 3000); // Adjust time as necessary
  }
}
