import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormService } from 'src/app/form/services/form.service';
import { DatePipe } from '@angular/common';
import { CellEditor } from '../editor/cellEditor.component';
import { Observable, Subscription } from 'rxjs';
import { TableService } from '../../services/table.service';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: [
    `
      .my-header-class {
        background: #673ab7;
        color: white;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent implements OnInit {
  users$ = this.formService.users$;
  columnDefs: Object[] = [];
  rowData: Observable<Object[]>;
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
        headerClass: this.checkIfWeekend(date) ? 'my-header-class' : null,
        cellStyle: this.checkIfWeekend(date)
          ? { backgroundColor: '#F8F8F8' }
          : null,
      };
    });

    this.columnDefs.push({
      field: 'name_cyr',
      lockPosition: true,
      cellClass: 'locked-col',
    });
    this.columnDefs = this.columnDefs.concat(finalDates);
  }

  checkIfWeekend(date: any) {
    const current_date = new Date(date);
    if (current_date.getDay() == 6 || current_date.getDay() == 0) {
      return true;
    } else {
      return false;
    }
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
    console.log('Cell Clicked: ', event);
  }
  onCellValueChanged(event: any) {
    const name = event.data.name_cyr;
    const date = event.colDef.field;
    const value = event.newValue;
    this.formService.updateEmployeeSchedule(name, date, value);
  }
}
