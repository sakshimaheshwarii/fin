import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
interface UserProfile {
  // firstName: string;
  // lastName: string;
  name:string;
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
   name:'',
    email: '',
    mobile: '',
    aadharNumber: '',
    panNumber: ''
  };
  isEditing = false;
  private apiUrl = 'http://localhost:8087/api/user-profile';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private authService:AuthService) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getUserId();
    this.loadUserProfile();
  }

  getUserId(): Observable<number> {
    return this.http.get<number>('http://localhost:8087/api/user-profile/current-user-id');
  }
  

  initializeForm(): void {
    this.profileForm = this.fb.group({
      name: [this.userProfile.name, Validators.required],
      // lastName: [this.userProfile.lastName, Validators.required],
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
        this.http.get<UserProfile>(`${this.apiUrl}/get/${userId}`).subscribe(
          (profile) => {
            this.userProfile = profile;
            this.profileForm.patchValue(profile);
          },
          (error) => {
            console.error('Error loading user profile', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching user ID', error);
      }
    );
  }
  
  
  saveProfile(): void {
    if (this.profileForm.valid) {
      this.authService.getUserId().subscribe(
        (userId) => {
          this.userProfile = this.profileForm.value;
          this.http.put(`${this.apiUrl}/update/${userId}`, this.userProfile).subscribe(
            (response) => {
              console.log('User profile saved successfully', response);
              confirm('Are you sure you want to save the changes?');
              this.isEditing = false;
              alert('Details Saved Successfully!!');
            },
            (error) => {
              console.error('Error saving user profile', error);
            }
          );
        },
        (error) => {
          console.error('Error fetching user ID', error);
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
