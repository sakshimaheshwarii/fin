import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home-default',
  templateUrl: './home-default.component.html',
  styleUrls: ['./home-default.component.css'],
  animations: [
    trigger('fadeInDown', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('1s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('1s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('carouselAnimation', [
      transition(':enter', [
        style({ transform: 'scale(1.1)' }),
        animate('0.7s ease-out', style({ transform: 'scale(1)' }))
      ])
    ]),
    trigger('scrollReveal', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('0.8s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class HomeDefaultComponent implements OnInit {
  currentSlide = 0;
  carouselImages = [
    { src: '../../../assets/financialplanning.jpg', alt: 'Financial Planning' },
    { src: '../../../assets/1.png', alt: 'Investment Solutions' },
    { src: '../../../assets/eduloan.jpg', alt: 'Loan Services' },
    { src: '../../../assets/homeloan.jpg', alt: 'Loan Services' },
    { src: '../../../assets/loan2.jpg', alt: 'Loan Services' },
    { src: '../../../assets/bank.png', alt: 'Loan Services' },
    { src: '../../../assets/2.png', alt: 'Loan Services' },
    { src: '../../../assets/3.png', alt: 'Loan Services' },
    { src: '../../../assets/4.png', alt: 'Loan Services' },
    { src: '../../../assets/5.png', alt: 'Loan Services' },
    { src: '../../../assets/6.png', alt: 'Loan Services' },

  ];
  features = [
    {
      icon: 'trending_up',
      title: 'Financial Planning',
      description: 'Gain a clear roadmap for your financial journey with our expert planners. We analyze your financial goals, income, and expenses to provide you with a tailored plan that balances your immediate needs and future ambitions. Our guidance ensures that every decision you make is a step toward long-term financial security and growth.'
    },
    {
      icon: 'attach_money', 
      title: 'Loan Services',
      description: 'Explore customized loan solutions designed to fit your unique requirements, whether for personal, educational, or business purposes. Our team works with you to find the best rates, terms, and loan structures, ensuring a smooth application process. We are committed to helping you secure financing that aligns with your financial goals and repayment ability.'
    },
    {
      icon: 'security',
      title: 'Secure Solutions',
      description: 'Your security is our highest priority. We use industry-leading encryption and multi-layered security protocols to protect your sensitive data and transactions. From identity verification to fraud detection, every transaction and interaction is safeguarded with cutting-edge technology to ensure your peace of mind while using our platform.'
    }
  ];










  ngOnInit() {
    setInterval(() => this.nextSlide(), 5000);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.carouselImages.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.carouselImages.length) % this.carouselImages.length;
  }
}

