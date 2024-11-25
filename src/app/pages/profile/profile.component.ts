import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';

interface UserProfile {
  name: string;
  email: string;
  mobile: string;
  aadharNumber?: string;
  panNumber?: string;
}

@Component({
  selector: 'app-user-details',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  userProfile: UserProfile = {
    name: '',
    email: '',
    mobile: '',
    aadharNumber: '',
    panNumber: ''
  };
  isEditing = false;
  private apiUrl = 'http://localhost:8087/api/user-profile';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadUserProfile();
  }

  initializeForm(): void {
    this.profileForm = this.fb.group({
      name: [this.userProfile.name, Validators.required],
      email: [this.userProfile.email, [Validators.required, Validators.email]],
      mobile: [
        this.userProfile.mobile,
        [Validators.required, Validators.pattern(/^\d{10}$/)]
      ],
      aadharNumber: [
        this.userProfile.aadharNumber,
        Validators.pattern(/^\d{12}$/)
      ],
      panNumber: [
        this.userProfile.panNumber,
        Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]$/)
      ]
    });
  }

  loadUserProfile(): void {
    this.authService.getUserId().subscribe(
      (userId: number) => {
        console.log('Fetched User ID:', userId);
        this.http.get<UserProfile>(`${this.apiUrl}/get/${userId}`).subscribe(
          (profile) => {
            this.userProfile = profile;
            this.profileForm.patchValue(profile);
          },
          (error) => {
            console.error('Error loading user profile:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching user ID:', error);
      }
    );
  }

  saveProfile(): void {
    if (this.profileForm.valid) {
      if (confirm('Are you sure you want to save the changes?')) {
        this.authService
          .getUserId()
          .pipe(
            switchMap((userId: number) =>
              this.http.put(`${this.apiUrl}/update/${userId}`, this.profileForm.value)
            )
          )
          .subscribe(
            (response) => {
              this.toastr.success('Profile updated successfully!');
              this.isEditing = false;
            },
            (error) => {
              console.error('Error saving user profile:', error);
              this.toastr.error('Failed to update profile. Please try again later.');
            }
          );
      }
    } else {
      this.toastr.error('Please fix the validation errors before saving.');
    }
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.profileForm.patchValue(this.userProfile);
    }
  }

  goBack(): void {
    this.router.navigate(['/admin']);
  }
}
