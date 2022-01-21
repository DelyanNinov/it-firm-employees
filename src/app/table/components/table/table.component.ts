import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormService } from 'src/app/form/services/form.service';
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
export class TableComponent implements OnInit, OnChanges {
  @ViewChild('table') private table: ElementRef;
  @Input() startingDate: string = '';
  @Input() endingDate: string = '';
  users$ = this.formService.users$;
  columnDefs: Object[] = [];
  rowData: Observable<Object[]>;
  frameworkComponents = { mySimpleEditor: CellEditor };
  userSub: Subscription;

  constructor(
    private formService: FormService,
    private tableService: TableService
  ) {}

  ngOnInit(): void {
    this.rowData = this.tableService.getUserData();
  }
  ngOnChanges() {
    //this.table.nativeElement.remove();
    this.columnDefs = [];
    let formatedDates = this.tableService.getFormatedDates(
      this.startingDate,
      this.endingDate
    );
    console.log(this.startingDate);

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
  setupTable() {}

  checkIfWeekend(date: any) {
    const current_date = new Date(date);
    if (current_date.getDay() == 6 || current_date.getDay() == 0) {
      return true;
    } else {
      return false;
    }
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
