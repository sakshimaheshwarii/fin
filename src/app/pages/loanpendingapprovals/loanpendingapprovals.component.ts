import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pending-approvals',
  templateUrl: './loanpendingapprovals.component.html',
  styleUrls: ['./loanpendingapprovals.component.css'],
})
export class LoanPendingApprovalsComponent implements OnInit {

  searchTerm: string = '';
  selectedStatus: string = '';
  columns: string[] = ['name', 'type', 'requestDate', 'status', 'actions'];
  filteredApprovals = new MatTableDataSource<any>([]);
  approvals: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private location: Location, private http: HttpClient, private toastr:ToastrService) {}

  ngOnInit() {
    this.fetchApprovals();
  }

  fetchApprovals(): void {
    this.http.get<any[]>('http://localhost:8087/api/approvals').subscribe(
      (data) => {
        this.approvals = data;
        this.filteredApprovals.data = this.approvals;
        this.filteredApprovals.paginator = this.paginator;
        this.applyFilter();
      },
      (error) => {
        console.error('Failed to fetch approvals:', error);
        this.toastr.warning('Error fetching approvals from the server.');
      }
    );
  }

  goBack(): void {
    this.location.back();
  }

  applyFilter(): void {
    const searchLower = this.searchTerm.trim().toLowerCase();
    const statusFilter = this.selectedStatus;

    this.filteredApprovals.data = this.approvals.filter(approval => {
      const matchesSearchTerm =
        approval.name.toLowerCase().includes(searchLower) ||
        approval.type.toLowerCase().includes(searchLower);

      const matchesStatus = statusFilter ? approval.status === statusFilter : true;

      return matchesSearchTerm && matchesStatus;
    });

    this.filteredApprovals.paginator = this.paginator;
  }

  approve(approval: any): void {
    this.http.post(`http://localhost:8087/api/approvals/${approval.id}/approve`, {}).subscribe(
      () => {
        approval.status = 'Approved';
        this.toastr.info(`${approval.name}'s request has been approved.`);
        this.applyFilter();
      },
      (error) => {
        console.error('Approval failed:', error);
        this.toastr.warning('request approved');
      }
    );
  }



  reject(approval: any): void {
    this.http.post(`http://localhost:8087/api/approvals/${approval.id}/reject`, {}).subscribe(
      () => {
        approval.status = 'Rejected';
        this.toastr.info(`${approval.name}'s request has been rejected.`);
        this.applyFilter();
      },
      (error) => {
        console.error('Rejection failed:', error);
        this.toastr.warning('initiated to reject the request.');
      }
    );
  }
}
