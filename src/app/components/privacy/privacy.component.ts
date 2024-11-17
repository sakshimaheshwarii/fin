// privacy.component.ts
import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface PolicySection {
  title: string;
  content: string;
  isExpanded: boolean;
}

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-out', style({ opacity: 1 }))
      ])
    ]),
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '80px',
        overflow: 'hidden'
      })),
      state('expanded', style({
        height: '*'
      })),
      transition('collapsed <=> expanded', [
        animate('0.3s ease-in-out')
      ])
    ])
  ]
})

export class PrivacyComponent {
  policySections: PolicySection[] = [
    {
      title: 'Introduction',
      content: 'At ResolveX, we are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your information.',
      isExpanded: false
    },
    {
      title: 'Information We Collect',
      content: 'We collect personal information such as your name, contact details, and financial information necessary for loan origination.',
      isExpanded: false
    },
    {
      title: 'How We Use Your Information',
      content: 'Your information is used to process loan applications, verify identity, and improve our services.',
      isExpanded: false
    },
    {
      title: 'Data Security',
      content: 'We implement robust security measures to protect your data from unauthorized access and breaches.',
      isExpanded: false
    },
    {
      title: 'Your Rights',
      content: 'You have the right to access, correct, or delete your personal information at any time.',
      isExpanded: false
    },
    {
      title: 'Changes to This Policy',
      content: 'We may update this policy periodically. We will notify you of any significant changes.',
      isExpanded: false
    }
  ];

  toggleSection(index: number): void {
    this.policySections[index].isExpanded = !this.policySections[index].isExpanded;
  }

  trackByFn(index: number, item: PolicySection): string {
    return item.title;
  }
}