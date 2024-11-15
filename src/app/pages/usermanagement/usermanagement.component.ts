import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

interface UserManagement {
  id: number;
  username: string;
  email: string;
  role: "User";
}

@Component({
  selector: 'app-user-management',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css'],
})
export class UserManagementComponent implements OnInit {
  users: UserManagement[] = [];
  filteredUsers = new MatTableDataSource<UserManagement>(this.users);
  searchTerm: string = '';
  selectedUser: UserManagement | null = null;
  columns: string[] = ['id', 'name', 'email', 'role', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private apiUrl = 'http://localhost:8087/v1/users/';

  constructor(
    private http: HttpClient,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.http.get<UserManagement[]>(`${this.apiUrl}get`).subscribe(
      (data) => {
        this.users = data;
        this.filteredUsers.data = this.users;
        this.filteredUsers.paginator = this.paginator;
        this.filteredUsers.sort = this.sort;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }


  applyFilter() {
    const filterValue = this.searchTerm.trim().toLowerCase();

    if (!filterValue) {
      // If there's no search term, show all users
      this.filteredUsers.data = [...this.users];
    } else {
      // Filter users with null/undefined checks
      this.filteredUsers.data = this.users.filter(user => {
        const username = user.username ? user.username.toLowerCase() : '';
        const email = user.email ? user.email.toLowerCase() : '';
        const role = user.role ? user.role.toLowerCase() : '';

        return username.includes(filterValue) || email.includes(filterValue) || role.includes(filterValue);
      });
    }
  }





  onPaginateChange(event: PageEvent) {
    console.log('Page Event:', event);
  }

  navigateToAddUser() {
    this.router.navigate(['/welcome']);
  }

  editUser(user: UserManagement) {
    alert(`Editing ${user.username}`);
    this.selectedUser = user;
  }

  deleteUser(user: UserManagement) {
    if (confirm(`Are you sure you want to delete ${user.username}?`)) {
      this.http.delete(`${this.apiUrl}${user.id}`).subscribe(
        () => {
          this.users = this.users.filter(u => u.id !== user.id);
          this.applyFilter();
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }

  goBack() {
    this.location.back();
  }
}
