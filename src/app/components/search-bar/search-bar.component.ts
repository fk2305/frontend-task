import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  searchText: string = '';
  @Output() searchTextChanged = new EventEmitter<string>();

  constructor() {}

  onSearchTextChange() {
    this.searchTextChanged.emit(this.searchText.trim().toLowerCase());
  }
}
