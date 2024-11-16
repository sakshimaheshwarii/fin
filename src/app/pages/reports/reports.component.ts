import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent {
  public reportEntries = [
    { date: '2023-10-01', description: 'Loan Application Fees', amount: 500 },
    { date: '2023-10-02', description: 'Service Fees', amount: 300 },
    { date: '2023-10-03', description: 'Interest Income', amount: 800 },
    { date: '2023-10-04', description: 'Penalty Fees', amount: 150 },
    { date: '2023-10-05', description: 'Consultation Charges', amount: 400 },
  ];

  public filteredEntries: any[] = [...this.reportEntries];
  public startDate: string = '';
  public endDate: string = '';

  // Chart Data
  public barChartData: any[] = [];
  public pieChartData: any[] = [];

  constructor(public chartElem: ElementRef, private router: Router) {
    this.initializeCharts();
  }

  public generateReport(): void {
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);

    if (this.startDate && this.endDate) {
      this.filteredEntries = this.reportEntries.filter((entry) => {
        const entryDate = new Date(entry.date);
        return entryDate >= start && entryDate <= end;
      });
    } else {
      this.filteredEntries = [...this.reportEntries]; // Reset to all entries
    }

    this.updateChartData();
  }

  public goBack(): void {
    this.router.navigate(['/admin']); // Navigate back to the admin dashboard
  }

  // Initialize Charts
  private initializeCharts(): void {
    this.updateChartData();
  }

  private updateChartData(): void {
    // Bar Chart: Revenue Distribution
    this.barChartData = this.filteredEntries.map((entry) => ({
      name: entry.description,
      value: entry.amount,
    }));

    // Pie Chart: Loan Type Distribution (Static Example)
    this.pieChartData = [
      { name: 'Personal Loan', value: 40 },
      { name: 'Home Loan', value: 25 },
      { name: 'Education Loan', value: 35 },
    ];
  }
}
