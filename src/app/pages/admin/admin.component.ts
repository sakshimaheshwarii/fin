import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  totalLoans: number = 0;
  pendingApprovals: number = 0;
  totalUsers: number = 0;
  monthlyRevenue: number = 0;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private router: Router, private dashboardService: DashboardService, private toastr:ToastrService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.dashboardService.getDashboardStats().subscribe(
      (data) => {
        this.totalLoans = data.totalLoans;
        this.pendingApprovals = data.pendingApprovals;
        this.totalUsers = data.totalUsers;
        this.monthlyRevenue = data.monthlyRevenue;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Error fetching dashboard data';
        this.isLoading = false;
      }
    );
  }

  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }

  logout(): void {
    this.router.navigate(['/logout']);
    this.toastr.info("You are logging Out!");
  }

}
