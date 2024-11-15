import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate, query, stagger } from '@angular/animations';

interface LoanAggregator {
  name: string;
  url: string;
  description: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    // Fade in animation
    trigger('fadeInDown', [
      transition(':enter', [
        style({ transform: 'translateY(-20px)', opacity: 0 }),
        animate('0.5s ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    // Action cards animation
    trigger('cardStagger', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(50px)' }),
          stagger('100ms', [
            animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    // Notification badge animation
    trigger('badgePulse', [
      state('active', style({ transform: 'scale(1)' })),
      state('inactive', style({ transform: 'scale(0.95)' })),
      transition('active <=> inactive', animate('0.3s ease-in-out'))
    ]),
    // Dashboard cards animation
    trigger('dashboardCards', [
      transition(':enter', [
        query('.card', [
          style({ opacity: 0, transform: 'translateX(-30px)' }),
          stagger('150ms', [
            animate('0.6s ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ])
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit {
  notifications = [
    { message: 'Your loan application has been approved!', icon: 'check_circle' },
    { message: 'Payment reminder: EMI due tomorrow.', icon: 'warning' },
    { message: 'New loan offer available.', icon: 'local_offer' }
  ];
  unreadNotifications = this.notifications.length;

  loanAggregators: LoanAggregator[] = [
    {
      name: 'BankBazaar',
      url: 'https://www.bankbazaar.com',
      description: 'Compare personal loan offers instantly'
    },
    {
      name: 'PaisaBazaar',
      url: 'https://www.paisabazaar.com',
      description: 'Get personalized loan recommendations'
    },
    {
      name: 'LoanBaba',
      url: 'https://www.loanbaba.com',
      description: 'Find low-interest personal loans'
    },
    {
      name: 'CreditMantri',
      url: 'https://www.creditmantri.com',
      description: 'Improve your CIBIL score and get better loans'
    },
    {
      name: 'LoanSphere',
      url: 'https://www.loansphere.com',
      description: 'Get customised loan recommendations'
    }
  ];

  recentActivities: string[] = [
    'You applied for a loan of ₹50,000 on 15th Oct 2024.',
    'Your EMI payment for Home Loan is due tomorrow.',
    'New loan offer available with 10% interest rate.'
  ];

  financialTips: string[] = [
    'A higher CIBIL score improves your chances of loan approval.',
    'Keep your debt-to-income ratio below 40% for financial stability.'
  ];

  potentialIssues: string[] = [
    'Low CIBIL Score',
    'Insufficient Income',
    'High Debt-to-Income Ratio',
    'Missing Documentation'
  ];

  constructor(private router: Router) {} // Inject Router

  ngOnInit(): void {
    console.log('Dashboard loaded with notifications:', this.notifications);
  }

  checkScore() {
    this.router.navigate(['/user-score']);
  }

  markAllAsRead(): void {
    this.unreadNotifications = 0;
  }

  startNewLoan(): void {
    this.router.navigate(['/new-loan']); // Navigate to New Loan Application
  }

  trackLoanStatus(): void {
    this.router.navigate(['/loan-status']); // Navigate to Track Loan Status
  }

  viewLoanHistory(): void {
    this.router.navigate(['/loan-history']); // Navigate to Loan History
  }

  resolveIssues(): void {
    this.router.navigate(['/resolve-issues']); // Navigate to Resolve Issues
  }

  openLoanCalculator(): void {
    this.router.navigate(['/loan-calculator']); // Navigate to Loan Calculator
  }
}
