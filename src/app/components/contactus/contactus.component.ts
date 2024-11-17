import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent {
    contact = {
      name: '',
      email: '',
      message: ''
    };
  
    constructor(private http: HttpClient, private toastr:ToastrService) {}  // <-- Inject HttpClient
  
    clearForm(form: NgForm): void {
      form.resetForm();
      this.contact = { name: '', email: '', message: '' };
    }
  
    onSubmit(form: NgForm) {
      if (form.valid) {
        this.http.post('http://localhost:8087/api/contact', this.contact, { responseType: 'text' }).subscribe(
          (response: string) => {
            alert(response); // Should receive the success message from Spring Boot
            console.log('Response:', response);
            this.clearForm(form);
          },
          error => {
            this.toastr.warning('error in submitting the form.');
            console.error('Error:', error);
          }
        );
      } else {
        this.toastr.error('Please fill out the form correctly.');
      }
    }
  
  }
  