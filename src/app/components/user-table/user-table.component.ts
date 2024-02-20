import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent {
  @Input() users: User[] = [];
  @Input() selectedRows: Set<string> = new Set();
  @Output() toggleRowSelection = new EventEmitter<string>();
  @Output() toggleSelectAllRows = new EventEmitter<boolean>();
  @Output() edit: EventEmitter<User> = new EventEmitter<User>();
  @Output() delete: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  toggleSelection(userId: string) {
    this.toggleRowSelection.emit(userId);
  }

  toggleSelectAll(event: any) {
    const isChecked = event.target.checked;
    this.toggleSelectAllRows.emit(isChecked);
  }

  isRowSelected(userId: string): boolean {
    return this.selectedRows.has(userId);
  }
  editUser(user: User) {
    user.isEditing = true; // Set the flag to indicate editing mode
  }

  saveUser(user: User) {
    user.isEditing = false; // Reset the editing flag
    this.edit.emit(user); // Emit an event to notify parent component about the edited user
  }

  cancelEdit(user: User) {
    user.isEditing = false; // Reset the editing flag
  }

  deleteUser(userId: string) {
    this.delete.emit(userId);
  }
}
