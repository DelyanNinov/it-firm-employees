import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {HttpClientModule} from '@angular/common/http'
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from '../shared/modules/material/material.module';
import { TableComponent } from "./components/table/table.component";
import { AgGridModule } from "ag-grid-angular";
const routes = [
    {
      path: 'table',
      component: TableComponent,
    },
  ]
@NgModule({
    imports: [
        CommonModule, 
        MaterialModule,
        HttpClientModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        NoopAnimationsModule,
        FlexLayoutModule,
        AgGridModule.withComponents([])
        
    ],
  declarations: [TableComponent],
})
export class TableModule {}