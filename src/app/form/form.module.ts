import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './components/form.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../shared/modules/material/material.module';
import { HttpClientModule } from '@angular/common/http';
const routes = [
  {
    path: '',
    component: FormComponent,
  },
];
@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  exports: [FormComponent],
  declarations: [FormComponent],
})
export class FormModule {}
