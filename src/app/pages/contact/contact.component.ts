import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';  // <-- Import HttpClient

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contact = {
    name: '',
    email: '',
    message: ''
  };

  constructor(private http: HttpClient) {}  // <-- Inject HttpClient

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
          alert('There was an error submitting the form.');
          console.error('Error:', error);
        }
      );
    } else {
      alert('Please fill out the form correctly.');
    }
  }

}
