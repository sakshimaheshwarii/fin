import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';

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

  constructor(private location: Location, private http: HttpClient) {}

  ngOnInit() {
    this.fetchApprovals();
  }

  // Fetch approvals from backend
  fetchApprovals(): void {
    this.http.get<any[]>('http://localhost:8087/api/approvals').subscribe(
      (data) => {
        this.approvals = data;
        this.filteredApprovals.data = this.approvals;
        this.filteredApprovals.paginator = this.paginator;
        this.applyFilter(); // Apply filter after fetching data
      },
      (error) => {
        console.error('Failed to fetch approvals:', error);
        alert('Error fetching approvals from the server.');
      }
    );
  }

  goBack(): void {
    this.location.back();
  }

  // Filter approvals based on search term and selected status
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

    this.filteredApprovals.paginator = this.paginator; // Update paginator after filtering
  }

  // Approve a specific request
  approve(approval: any): void {
    this.http.post(`http://localhost:8087/api/approvals/${approval.id}/approve`, {}).subscribe(
      () => {
        approval.status = 'Approved';
        alert(`${approval.name}'s request has been approved.`);
        this.applyFilter(); // Reapply filter to update the table view
      },
      (error) => {
        console.error('Approval failed:', error);
        alert('Failed to approve the request.');
      }
    );
  }

  // Reject a specific request
  reject(approval: any): void {
    this.http.post(`http://localhost:8087/api/approvals/${approval.id}/reject`, {}).subscribe(
      () => {
        approval.status = 'Rejected';
        alert(`${approval.name}'s request has been rejected.`);
        this.applyFilter(); // Reapply filter to update the table view
      },
      (error) => {
        console.error('Rejection failed:', error);
        alert('Failed to reject the request.');
      }
    );
  }
}
