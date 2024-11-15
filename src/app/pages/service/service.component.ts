import { Component } from '@angular/core';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {
  selectedService: any = null; // Holds the selected service for 'Learn More'

  services = [
    {
      id: 1,
      name: 'Loan Consulting',
      description: 'Expert advice to help you navigate the loan process.',
      icon: 'assets/loan1.jpg',
      details: 'Our Loan Consulting service provides personalized guidance to ensure you understand every aspect of the loan process. We help you assess your financial situation and navigate through loan options tailored to meet your specific needs.',
    },
    {
      id: 2,
      name: 'Financial Planning',
      description: 'Comprehensive plans tailored to your financial goals.',
      icon: 'assets/loan2.jpg',
      details: 'We assist in budgeting, investments, and risk management. Our experts help you create a roadmap for your financial success, with strategic plans to achieve long-term stability.',
    },
    {
      id: 3,
      name: 'Repayment Tracking',
      description: 'Stay updated on your repayment schedules and amounts.',
      icon: 'assets/loan3.png',
      details: 'Monitor repayment schedules, receive reminders for upcoming payments, and track progress to avoid missed payments and late fees.',
    },
    {
      id: 4,
      name: 'Issue Resolution',
      description: 'Prompt assistance for any issues you may face.',
      icon: 'assets/loan4.png',
      details: 'Our support team provides quick solutions for any problems related to loans, transactions, or account management.',
    },
    {
      id: 5,
      name: 'Credit Score Improvement',
      description: 'Boost your credit score with personalized strategies.',
      icon: 'assets/loan5.png',
      details: 'We analyze your credit report and offer actionable strategies to improve your score, helping you secure better loan opportunities.',
    },
    {
      id: 6,
      name: 'Debt Consolidation Assistance',
      description: 'Simplify your finances by consolidating debts.',
      icon: 'assets/loan6.png',
      details: 'We provide assistance in consolidating multiple debts into a single payment plan, reducing interest rates and improving financial management.',
    }
  ];

  learnMore(service: any) {
    this.selectedService = service; // Set the selected service
  }

  closeDetails() {
    this.selectedService = null; // Close the details box
  }

  onImageError(event: any) {
    event.target.src = 'assets/loan1.png'; // Fallback for broken images
  }
}
