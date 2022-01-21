import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
})
export class TablePageComponent {
  startingDate = '';
  endingDate = '';
  constructor(private datePipe: DatePipe) {}

  OnDateStartChange(event: any) {
    const formatedDate = this.datePipe.transform(event, 'yyyy-MM-dd');
    if (formatedDate) {
      this.startingDate = formatedDate.toString();
    }
  }

  OnDateEndChange(event: any) {
    const formatedDate = this.datePipe.transform(event, 'yyyy-MM-dd');
    if (formatedDate) {
      this.endingDate = formatedDate.toString();
    }
  }
}
