import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface UserProfile {
  firstName: string;
  lastName: string;
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
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    aadharNumber: '',
    panNumber: ''
  };
  isEditing = false;
  private apiUrl = 'http://localhost:8087/api/user-profile';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadUserProfile();
  }

  initializeForm(): void {
    this.profileForm = this.fb.group({
      firstName: [this.userProfile.firstName, Validators.required],
      lastName: [this.userProfile.lastName, Validators.required],
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
    const userId = 1; // Replace with the actual user ID if dynamic
    this.http.get<UserProfile>(`${this.apiUrl}/${userId}`).subscribe(
      (profile) => {
        this.userProfile = profile;
        this.profileForm.patchValue(profile);
      },
      (error) => {
        console.error('Error loading user profile', error);
      }
    );
}

saveProfile(): void {
    if (this.profileForm.valid) {
      const userId = 1; // Replace with actual user ID
      this.userProfile = this.profileForm.value;
      this.http.put(`${this.apiUrl}/${userId}`, this.userProfile).subscribe(
        (response) => {
          console.log('User profile saved successfully', response);
          confirm("Are you sure you want to save the changes?");
          this.isEditing = false;
          alert("Details Saved Successfully!!");
        },
        (error) => {
          console.error('Error saving user profile', error);
        }
      );
    }
}


  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.profileForm.patchValue(this.userProfile);
    }
  }

  // saveProfile(): void {
  //   if (this.profileForm.valid) {
  //     this.userProfile = this.profileForm.value;
  //     this.http.put(`${this.apiUrl}`, this.userProfile).subscribe(
  //       (response) => {
  //         console.log('User profile saved successfully', response);
  //         confirm("Are you sure you want to save the changes?");
  //         this.isEditing = false;
  //         alert("Details Saved SuccessFully!!");
  //       },
  //       (error) => {
  //         console.error('Error saving user profile', error);
  //       }
  //     );
  //   }
  // }

  goBack(): void {
    this.router.navigate(['/admin']); // Adjust the path as needed
  }
}
