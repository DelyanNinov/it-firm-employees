import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {HttpClientModule} from '@angular/common/http'
import { FormComponent } from "./components/form.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModue } from '../shared/modules/material/material.module';
const routes = [
    {
      path: 'form',
      component: FormComponent,
    },
  ]
@NgModule({
    imports: [
        CommonModule, 
        MaterialModue,
        HttpClientModule,
        MaterialModue,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        NoopAnimationsModule,
        FlexLayoutModule,
        
    ],
  declarations: [FormComponent],
})
export class FormModule {}