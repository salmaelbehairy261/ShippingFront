import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})
export class SortComponent {
  @Output() sort = new EventEmitter<number>();
  onSort(event: any)
  {
    this.sort.emit(event);
  }
}
