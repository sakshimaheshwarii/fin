import { Component, OnInit } from '@angular/core';
import { CibilService } from '../../services/cibil.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cibil-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css'],
})
export class ScoreComponent implements OnInit {
  userForm: FormGroup;
  bankNames = [
    "State Bank of India", "Union Bank of India", "Bank of India", "Indian Bank",
    "Central Bank of India", "Bank of Baroda", "Canara Bank", "Punjab National Bank",
    "Indian Overseas Bank", "Syndicate Bank", "Andhra Bank", "Corporation Bank",
    "ICICI Bank", "HDFC Bank", "Axis Bank", "Kotak Mahindra Bank", "Yes Bank",
    "IndusInd Bank", "Federal Bank", "IDFC First Bank", "RBL Bank", "South Indian Bank"
  ];
  step: number = 1;
  showResultBox: boolean = false;
  Score: number = 0;
  Status: string = '';
  showPersonalInfo: boolean = false;
  otp: string = '';
  generatedOtp: string = '';
  userId: number = 1;

  constructor(
    private fb: FormBuilder,
    private cibilService: CibilService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    this.userForm = this.fb.group({
      bankName: ['', Validators.required],
      accountNumber: [
        '', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]
      ],
      mobileNumber: [
        '', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]
      ],
      otp: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(
      (user: any) => {
        this.userId = user.id;
        this.fetchUserCibilScore();
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  getCibilScore() {
    this.showPersonalInfo = true;
    this.showResultBox = false;
    this.step = 1;

    this.cibilService.sendOtp(this.userForm.value.mobileNumber).subscribe(
      (response: any) => {
        this.generatedOtp = response.otp;
        this.toastr.success('OTP sent successfully.');
      },
      (error) => {
        this.toastr.warning('Error in sending OTP. Please try again.');
      }
    );
  }

  fetchUserCibilScore() {
    if (!this.userId) {
      this.toastr.error('User ID is missing.');
      return;
    }

    this.cibilService.getCibilScore(this.userId).subscribe(
      (response: any) => {
        this.Score = response;
        this.updateStatus();
      },
      (error) => {
        if (error.status === 410) {
          this.toastr.error('User removed due to negative CIBIL score.');
        } else {
          console.error('Error fetching CIBIL score:', error);
          this.toastr.error('Error fetching CIBIL score.');
        }
      }
    );
  }

  updateStatus() {
    if (this.Score < 550) {
      this.Status = 'Bad';
    } else if (this.Score < 650) {
      this.Status = 'Poor';
    } else if (this.Score < 700) {
      this.Status = 'Fair';
    } else if (this.Score < 750) {
      this.Status = 'Good';
    } else {
      this.Status = 'Excellent';
    }
  }

  async fetchDetails() {
    try {
      await this.verifyOtp();
      this.showResultBox = true;
      this.saveCibilScore();
    } catch (error) {
      this.toastr.warning('OTP verification failed. Please try again.');
    }
  }

  saveCibilScore() {
    this.cibilService.saveCibilScore(this.userId, this.Score, this.Status).subscribe(
      (response: any) => {
        this.toastr.success('CIBIL score saved successfully.');
      },
      (error) => {
        console.error('Error saving CIBIL score:', error);
        this.toastr.error('Error saving CIBIL score.');
      }
    );
  }

  verifyOtp(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.otp === this.generatedOtp) {
        resolve();
      } else {
        reject();
      }
    });
  }
}
