import { Component, OnInit } from "@angular/core";
import { FormService } from "src/app/form/services/form.service";
import { ColDef } from 'ag-grid-community'; 
import { DatePipe } from '@angular/common';
@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit{

  constructor (private formService: FormService, private datePipe: DatePipe){}
  users$ = this.formService.users$;
  columnDefs: any[] = [];

rowData = this.formService.users$;
    ngOnInit(): void {
      let users = []
      this.users$.subscribe((users)=>{
        users.map((user)=> {
          let name = user.name_cyr
          let dates = user.workingDays
          let newUser = {...dates, name}
          console.log(newUser);
          
          
        })
        
      })

      const d = new Date("2022-01-01");
      const f = new Date("2022-01-05");
      const dates = this.getDaysArray(d, f)
      const formatedDates = dates.map((date)=> this.datePipe.transform(date, 'yyyy-MM-dd'))
      const finalDates = formatedDates.map((date)=> {
        return {field: date}
      })
      
      console.log(formatedDates);
      
    this.columnDefs.push( {field: 'name_cyr'})
    this.columnDefs = this.columnDefs.concat(finalDates);
    // console.log(this.columnDefs);
    }
    getDaysArray (start:Date, end:Date) {
      for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
          arr.push(new Date(dt));
      }
      return arr;
  };
}