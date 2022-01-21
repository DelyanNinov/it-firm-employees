import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/form/services/form.service';
import { DatePipe } from '@angular/common';
import { CellEditor } from '../editor/cellEditor.component';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  users$ = this.formService.users$;
  columnDefs: Object[] = [];
  rowData: Object[] = [];
  frameworkComponents = { mySimpleEditor: CellEditor };
  constructor(private formService: FormService, private datePipe: DatePipe) {}
  ngOnInit(): void {
    this.users$.subscribe((users) => {
      users.map((user) => {
        let name = user.name_cyr;
        let dates = user.workingDays.map((user) => {
          const userArr = Object.values(user);
          const userObj = {
            [userArr[0]]: userArr[1],
          };
          return userObj;
        });
        let newUser = {};
        Object.assign(newUser, { name_cyr: name });
        dates.forEach((date) => {
          Object.assign(newUser, date);
        });
        this.rowData.push(newUser);
        console.log(this.rowData);
      });
    });

    this.setupTable();

    // console.log(this.columnDefs);
  }

  setupTable() {
    const d = new Date('2022-01-01');
    const f = new Date('2022-01-30');
    const dates = this.getDaysArray(d, f);
    const formatedDates = dates.map((date) =>
      this.datePipe.transform(date, 'yyyy-MM-dd')
    );
    const finalDates = formatedDates.map((date) => {
      return {
        field: date,
        cellEditor: 'mySimpleEditor',
        editable: true,
        singleClickEdit: true,
      };
    });

    this.columnDefs.push({
      field: 'name_cyr',
      lockPosition: true,
      cellClass: 'locked-col',
    });
    this.columnDefs = this.columnDefs.concat(finalDates);
    console.log(this.columnDefs);
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
