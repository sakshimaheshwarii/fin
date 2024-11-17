import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from '../../services/settings.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  profileForm!: FormGroup;
  loanParametersForm!: FormGroup;
  notificationsEnabled = false;
  autoApproveLoans = false;

  constructor(private fb: FormBuilder, private settingsService: SettingsService, private toastr:ToastrService) {}

  ngOnInit(): void {
    // Initialize form groups
    this.profileForm = this.fb.group({
      adminName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.loanParametersForm = this.fb.group({
      defaultInterestRate: [0, Validators.required],
      maxLoanAmount: [0, Validators.required],
    });

    // Load initial settings
    this.loadSettings();
  }

  loadSettings(): void {
    this.settingsService.getSettings().subscribe((settings: any) => {
      this.profileForm.patchValue({
        adminName: settings.adminName,
        email: settings.email,
      });
      this.loanParametersForm.patchValue({
        defaultInterestRate: settings.defaultInterestRate,
        maxLoanAmount: settings.maxLoanAmount,
      });
      this.notificationsEnabled = settings.notificationsEnabled;
      this.autoApproveLoans = settings.autoApproveLoans;
    });
  }

  onSubmitProfile(): void {
    if (this.profileForm.valid) {
      this.settingsService.updateProfile(this.profileForm.value).subscribe(() => {
        this.toastr.success('Profile updated successfully');
      });
    }
  }

  onSubmitLoanParameters(): void {
    if (this.loanParametersForm.valid) {
      this.settingsService.saveLoanParameters(this.loanParametersForm.value).subscribe(() => {
        this.toastr.success('Loan parameters updated successfully');
      });
    }
  }

  toggleNotifications(enabled: boolean): void {
    this.notificationsEnabled = enabled;
    // Save preference to the backend if needed
  }

  toggleAutoApproveLoans(enabled: boolean): void {
    this.autoApproveLoans = enabled;
    // Save preference to the backend if needed
  }

  goBack(): void {
    // Navigation logic here
  }
}
