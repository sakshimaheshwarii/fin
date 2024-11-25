import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-issue-resolution',
  templateUrl: './issue-resolution.component.html',
  styleUrls: ['./issue-resolution.component.css'],
})
export class IssueResolutionComponent implements OnInit {
  issueDescription: string = '';
  selectedIssue: any = null;
  commonIssues: any[] = [
    {
      title: 'Loan Disapproval',
      description: 'Your loan was disapproved due to low credit score.',
      reason: 'Loan was disapproved due to low credit score.',
      solution: 'Ensure your credit score is above the threshold.',
      tips: ['Check your credit report', 'Update any incorrect information'],
      icon: 'assets/icons/loan_disapproval.jpg',
      agentEmail: 'loansupport@resolvex.com',
      agentContact: '+1234567890',
      extraHelp: 'Consider seeking a cosigner for your loan.'
    },
    {
      title: 'Late Payment',
      description: 'Your payment is overdue.',
      reason: 'Payment is overdue.',
      solution: 'Contact us to discuss payment arrangements.',
      tips: ['Review your payment history', 'Contact your loan officer'],
      icon: 'assets/icons/late_payment.jpg',
      agentEmail: 'paymentissues@resolvex.com',
      agentContact: '+1234567891',
      extraHelp: 'Explore options for refinancing.'
    },
    {
      title: 'Missing Documents',
      description: 'Required documents were not submitted.',
      reason: 'Required documents were not submitted.',
      solution: 'Ensure all documents are submitted.',
      tips: ['Check your email for requests', 'Submit missing documents as soon as possible'],
      icon: 'assets/icons/missing_documents.jpg',
      agentEmail: 'documenthelp@resolvex.com',
      agentContact: '+1234567892',
      extraHelp: 'Contact support for assistance.'
    },
    {
      title: 'Other Issues',
      description: 'Describes other issues.',
      reason: 'Provide details for assistance.',
      solution: 'Describe your issue in the textarea for personalized help.',
      tips: ['Describe your issue in the textarea', 'Submit for personalized assistance'],
      icon: 'assets/icons/other_issues.jpg',
      agentEmail: 'generalissues@resolvex.com',
      agentContact: '+1234567893',
      extraHelp: 'Review FAQs for common questions.'
    },
  ];

  constructor(public dialog: MatDialog, private location: Location, private http: HttpClient, private toastr:ToastrService) {}

  ngOnInit() {
  }

  openIssueDialog(issue: any) {
    this.selectedIssue = issue;
  }

  submitIssue() {
    if (!this.issueDescription.trim()) {
      this.toastr.info('Please describe your issue before submitting.');
      return;
    }

    this.http.post('http://localhost:8087/api/issues/submit', {}, {
      params: { description: this.issueDescription }
    }).subscribe({
      next: () => {
        this.toastr.success('Your issue has been submitted successfully!');
        this.issueDescription = '';
      },
      error: (error) => console.error('Error submitting issue:', error)
    });
  }

  goBack() {
    this.location.back();
  }

  onImageError(event: any) {
    event.target.src = 'assets/icons/loan_disapproval.jpg';
  }

  closeDetails() {
    this.selectedIssue = null;
  }

  learnMore(issue: any) {
    this.selectedIssue = issue;
  }

  openDetails(issue: any) {
    this.selectedIssue = issue;
  }
}
