import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-roleconfirmation',
  templateUrl: './roleconfirmation.component.html',
  styleUrls: ['./roleconfirmation.component.css']
})
export class RoleconfirmationComponent {
  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<RoleconfirmationComponent>
  ) {}

  closeDialog(isConfirmed: boolean): void {
    if (isConfirmed) {
      this.router.navigate(['/register']);
    } else {
      this.router.navigate(['/login']); 
    }
  }
}
