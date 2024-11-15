import { Component } from '@angular/core';

interface FAQ {
  question: string;
  answer: string;
  showAnswer?: boolean; // Optional property to track answer visibility
}

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {
  faqs= [
    { question: 'What is your return policy?', answer: 'You can return items within 30 days.' },
    { question: 'How do I track my order?', answer: 'You can track your order through the tracking link sent to your email.' },
    { question: 'How do I contact customer support?', answer: 'You can contact us via email or phone.' },
    { question: 'What payment methods do you accept?', answer: 'We accept credit cards, debit cards, and PayPal.' },
    { question: 'Do you offer international shipping?', answer: 'Yes, we ship to many countries worldwide.' },
    { question: 'Can I change my order after it has been placed?', answer: 'You can change your order within 1 hour of placing it.' },
    { question: 'Do missed EMI payments affect my credit score?', answer: 'Yes, missed EMI payments can significantly lower your credit score. Consistent timely payments are vital to maintaining a positive credit history.' },
    { question: 'How do I reset my password?', answer: 'You can reset your password through the "Forgot Password" link on the login page.' },
    { question: 'What happens if I pay EMI one day late?', answer: ' you may incur a late payment fee from your lender or financial institution.' },
    { question: 'How do I leave feedback?', answer: 'You can leave feedback through our contact form.' }
  ];

  activeIndex: number | null = null;

  toggleAnswer(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }
}
