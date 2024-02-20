import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  selectedRows: Set<string> = new Set();
  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number = 1;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }
  fetchUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
      this.filteredUsers = this.users;

      // Set currentPage to 1 and pageSize based on desired number of users per page
      this.currentPage = 1;
      const desiredUsersPerPage = 10;
      this.pageSize = desiredUsersPerPage;

      // Update filteredUsers to display only the users for the first page
      this.filteredUsers = this.users.slice(0, this.pageSize);

      // Calculate total pages
      this.totalPages = Math.ceil(this.users.length / this.pageSize);
    });
  }
  filterUsers(searchText: string) {
    // Filter users based on search text
    this.filteredUsers = this.users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(searchText.toLowerCase()) ||
        user.role.toLowerCase().includes(searchText.toLowerCase())
    );

    // Update currentPage to 1 when filtering to show results from the first page
    this.currentPage = 1;

    // Recalculate total pages based on filtered users
    this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);

    // Update filteredUsers to display users for the current page
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(
      startIndex + this.pageSize,
      this.filteredUsers.length
    );
    this.filteredUsers = this.filteredUsers.slice(startIndex, endIndex);
  }

  toggleRowSelection(userId: string) {
    if (this.selectedRows.has(userId)) {
      this.selectedRows.delete(userId);
    } else {
      this.selectedRows.add(userId);
    }
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;

    // Calculate the index of the first user for the selected page
    const startIndex = (pageNumber - 1) * this.pageSize;

    // Calculate the index of the last user for the selected page
    const endIndex = Math.min(startIndex + this.pageSize, this.users.length);

    // Update filteredUsers to display the users for the selected page
    this.filteredUsers = this.users.slice(startIndex, endIndex);
  }

  onSearchTextChanged(searchText: string) {
    this.filterUsers(searchText);
  }

  

  deleteSelectedRows() {
    // Remove selected rows from the users array
    this.users = this.users.filter((user) => !this.selectedRows.has(user.id));

    // Update filteredUsers to display the users for the current page
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.users.length);
    this.filteredUsers = this.users.slice(startIndex, endIndex);

    // Recalculate total pages based on updated users array
    this.totalPages = Math.ceil(this.users.length / this.pageSize);

    // Clear selectedRows set
    this.selectedRows.clear();
  }

  toggleSelectAllRows(isChecked: boolean) {
    this.selectedRows.clear();
    if (isChecked) {
      this.filteredUsers.forEach((user) => this.selectedRows.add(user.id));
    }
  }


  editUser(editedUser: User) {
    // Find the index of the edited user in the original users array
    const index = this.users.findIndex((user) => user.id === editedUser.id);
    if (index !== -1) {
      // Update the user details in the original users array
      this.users[index] = { ...editedUser };
       // Update filteredUsers to display the users for the current page
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.users.length);
    this.filteredUsers = this.users.slice(startIndex, endIndex);

    }
  }

  deleteUser(userId: string) {
    // Remove the user from the original users array
    this.users = this.users.filter((user) => user.id !== userId);
     // Update filteredUsers to display the users for the current page
     const startIndex = (this.currentPage - 1) * this.pageSize;
     const endIndex = Math.min(startIndex + this.pageSize, this.users.length);
     this.filteredUsers = this.users.slice(startIndex, endIndex);
 
  }
}
