import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OverviewService } from '../../services/overview.service'
@Component({
  selector: 'app-admin-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  totalUsers: number = 0;
  loanApplications: number = 0;
  pendingApprovals: number = 0;
  resolvedIssues: number = 0;

  constructor(
    private OverviewService: OverviewService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOverviewData();
  }

  loadOverviewData(): void {
    this.OverviewService.getAdminOverview().subscribe(
      (data) => {
        console.log("Overview Data: ", data);
        this.totalUsers = data.totalUsers;
        this.loanApplications = data.loanApplications;
        this.pendingApprovals = data.pendingApprovals;
        this.resolvedIssues = data.resolvedIssues;
      },
      (error) => {
        console.error('Error fetching admin overview data', error);
      }
    );
  }


  navigateToReports(): void {
    this.router.navigate(['/admin/reports']);
  }

  manageUsers(): void {
    this.router.navigate(['/admin/manage-users']);
  }

  goBack(): void {
    this.router.navigate(['/admin']);
  }
}
