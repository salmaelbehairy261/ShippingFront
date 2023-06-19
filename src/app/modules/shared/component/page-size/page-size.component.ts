import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-page-size',
  templateUrl: './page-size.component.html',
  styleUrls: ['./page-size.component.css']
})
export class PageSizeComponent {
  @Output() pageSizeChanged = new EventEmitter<number>();

  onPageSizeChanged(event: any)
  {
    this.pageSizeChanged.emit(event);
  }
}
