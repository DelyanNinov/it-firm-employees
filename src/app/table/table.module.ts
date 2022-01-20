import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../shared/modules/material/material.module';
import { TableComponent } from './components/table/table.component';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CellEditor } from './components/editor/cellEditor.component';
const routes = [
  {
    path: 'table',
    component: TableComponent,
  },
];
@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    MaterialModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    FlexLayoutModule,
    AgGridModule.withComponents([CellEditor]),
  ],
  declarations: [TableComponent, CellEditor],
})
export class TableModule {}
