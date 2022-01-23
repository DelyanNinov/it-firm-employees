import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../shared/modules/material/material.module';
import { TableComponent } from './components/table/table.component';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CellEditor } from './components/editor/cellEditor.component';
import { TablePageComponent } from './components/table-page/table-page.component';
const routes = [
  {
    path: '',
    component: TablePageComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    AgGridModule.withComponents([CellEditor]),
  ],
  declarations: [TableComponent, CellEditor, TablePageComponent],
})
export class TableModule {}
