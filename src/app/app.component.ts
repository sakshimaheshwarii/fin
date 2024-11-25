import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ResolveX: Loan Origination System';
  loading: boolean = true;

  constructor() {
    setTimeout(() => {
      this.loading = false;
    }, 3000); 
  }
}
