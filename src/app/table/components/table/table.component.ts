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
import { DatePipe, TitleCasePipe } from '@angular/common';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: [
    `
      .weekend-header-class {
        font-weight: bold;
        background: #d4f1f4;
        color: #5d8399;
      }
      .weekday-header-class {
        font-weight: bold;
        background: #f8f8f8;
        color: #3b4d57;
      }

      .home-class {
        font-weight: medium;
        background: #75e6da;
        color: #05445e;
      }

      .office-class {
        background: #2e8bc0;
        color: white;
      }

      .rest-class {
        background: #f8f8f8;
        color: #05445e;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent implements OnInit, OnChanges {
  @ViewChild('table') private table: ElementRef;
  @Input() startingDate: string = '';
  @Input() endingDate: string = '';

  columnDefs: Object[] = [];
  rowData: Observable<Object[]>;
  frameworkComponents = { mySimpleEditor: CellEditor };
  userSub: Subscription;
  gridOptions = {
    headerHeight: 80,
    animateRows: true,
  };
  gridApi: any;
  gridColumnApi: any;
  refresh: number = 0;
  constructor(
    private formService: FormService,
    private tableService: TableService,
    private titleCasePipe: TitleCasePipe,
    private datePipe: DatePipe
  ) {}
  onGridReady(params: any) {
    console.log('GRID READY');
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  ngOnInit(): void {
    //GET USER DATA
    console.log('ON INIT');
    this.rowData = this.tableService.getUserData();
  }

  ngOnChanges() {
    console.log('ON CHANGE');
    //this.refresh++;
    // const params = {
    //   force: true,
    // };
    // this.refresh > 1 ? this.gridApi.refreshCells(params) : null;

    this.columnDefs = [];
    let formatedDates = this.tableService.getFormatedDates(
      this.startingDate,
      this.endingDate
    );

    //////////////////////
    //DATES COLUMNS
    //////////////////////

    const finalDates = formatedDates.map((date: any) => {
      return {
        headerName: '',
        sortable: true,
        field: date,
        cellEditor: 'mySimpleEditor',
        editable: true,
        headerComponentParams: {
          template: `<div class="ag-cell-label-container" role="presentation">  
          <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>  
          <div ref="eLabel" class="ag-header-cell-label" role="presentation">    
              <span ref="eSortOrder" class="ag-header-icon ag-sort-order" ></span>    
              <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon" ></span>    
              <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon" ></span>    
              <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon" ></span>    
              <div>
              <div style="text-align: center">${this.getName(date)}</div> 
              <div>${date}</div> 
              </div> 
              <span ref="eText" class="ag-header-cell-text" role="columnheader"></span>    
              <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>  
          </div>
      </div>`,
        },
        width: 130,
        singleClickEdit: true,
        headerClass: this.checkIfWeekend(date)
          ? 'weekend-header-class'
          : 'weekday-header-class',
        cellClass: (params: any) => {
          if (params.value === 'home') {
            return 'home-class';
          }
          if (params.value === 'rest') {
            return 'rest-class';
          }
          if (params.value === 'office') {
            return 'office-class';
          }
          return 'default-class';
        },
        cellStyle: this.checkIfWeekend(date)
          ? { backgroundColor: '#D4F1F4' }
          : null,
      };
    });

    //////////////////////
    // NAME AREA COLUMN
    //////////////////////

    this.columnDefs.push(
      {
        resizable: true,
        width: 150,
        headerName: 'Име',
        field: 'name_cyr',
        pinned: 'left',
        filter: 'agTextColumnFilter',
        filterParams: {
          buttons: ['reset'],
          debounceMs: 200,
        },
        cellClass: 'locked-col',
        headerClass: 'weekday-header-class',
      },
      //////////////////////
      // WORKING AREA COLUMN
      //////////////////////
      {
        resizable: true,
        width: 150,
        headerName: 'Специалност',
        field: 'work_area',
        pinned: 'left',
        sortable: true,
        cellClass: 'locked-col',
        headerClass: 'weekday-header-class',
      },
      //////////////////////
      // COMPANY AREA COLUMN
      //////////////////////
      {
        headerName: 'Компания',
        resizable: true,
        width: 120,
        field: 'company',
        pinned: 'left',
        sortable: true,
        cellClass: 'locked-col',
        headerClass: 'weekday-header-class',
      },
      //////////////////////
      // TOTAL WORKING DAYS COLUMN
      //////////////////////
      {
        headerComponentParams: {
          template: `<div class="ag-cell-label-container" role="presentation">  
          <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>  
          <div ref="eLabel" class="ag-header-cell-label" role="presentation">    
              <span ref="eSortOrder" class="ag-header-icon ag-sort-order" ></span>    
              <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon" ></span>    
              <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon" ></span>    
              <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon" ></span>    
              <div style="text-align: center">
              <div >Отработени</div> 
              <div>Дни</div> 
              </div> 
              <span ref="eText" class="ag-header-cell-text" role="columnheader"></span>    
              <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>  
          </div>
      </div>`,
        },
        resizable: true,
        width: 120,
        valueGetter: this.allWorkDaysValueGetter.bind(this),
        pinned: 'left',
        sortable: true,
        cellClass: 'locked-col',
        headerClass: 'weekday-header-class',
      }
    );

    this.columnDefs = this.columnDefs.concat(finalDates);
  }
  allWorkDaysValueGetter(params: any) {
    let allOffice = 0;

    if (this.startingDate === '') {
      this.startingDate = this.tableService.startDate.toString();
    }
    if (this.endingDate === '') {
      this.endingDate = this.tableService.endDate.toString();
    }
    const daysRangeArr = this.tableService
      .getDaysArray(new Date(this.startingDate), new Date(this.endingDate))
      .map((date) => this.datePipe.transform(date, 'yyyy-MM-dd'));

    for (const [key, value] of Object.entries(params.data)) {
      if (typeof new Date(key).getMonth === 'function') {
        if (daysRangeArr.includes(key)) {
          if (value === 'office' || value === 'home') {
            allOffice++;
          }
        }
      }
    }

    return allOffice;
  }
  getName(date: string) {
    return this.titleCasePipe.transform(
      new Date(date).toLocaleDateString('bg-BG', { weekday: 'long' })
    );
  }

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
