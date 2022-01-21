import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/form/services/form.service';
import { DatePipe } from '@angular/common';
import { CellEditor } from '../editor/cellEditor.component';
import { Observable, Subscription } from 'rxjs';
import { TableService } from '../../services/table.service';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  users$ = this.formService.users$;
  columnDefs: Object[] = [];
  rowData: Observable<any>;
  frameworkComponents = { mySimpleEditor: CellEditor };
  userSub: Subscription;

  constructor(
    private formService: FormService,
    private datePipe: DatePipe,
    private tableService: TableService
  ) {}

  ngOnInit(): void {
    this.rowData = this.tableService.getUserData();
    this.setupTable();
  }

  setupTable() {
    //GET THE CURRENT MONTH AND RETURNS AN ARRAY OF DATES IN THE MONTH
    const today = new Date();
    let month = (today.getMonth() + 1).toString();
    if (month.length < 2) {
      month = '0' + month;
    }
    let lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    console.log(lastDay.getDate());
    const d = new Date(`2022-${month}-01`);
    const f = new Date(`2022-${month}-${lastDay.getDate()}`);
    const dates = this.getDaysArray(d, f);
    const formatedDates = dates.map((date) =>
      this.datePipe.transform(date, 'yyyy-MM-dd')
    );

    //POPULATES THE TABLE HEADERS
    const finalDates = formatedDates.map((date) => {
      return {
        field: date,
        cellEditor: 'mySimpleEditor',
        editable: true,
        width: 110,
        singleClickEdit: true,
        headerClass: '.my-header-class',
      };
    });

    this.columnDefs.push({
      field: 'name_cyr',
      lockPosition: true,
      cellClass: 'locked-col',
    });
    this.columnDefs = this.columnDefs.concat(finalDates);
  }

  getDaysArray(start: Date, end: Date) {
    for (
      var arr = [], dt = new Date(start);
      dt <= end;
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(new Date(dt));
    }
    return arr;
  }
  onCellClicked(event: any) {
    console.log(event);
  }
}
