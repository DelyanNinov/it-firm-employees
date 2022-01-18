import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {HttpClientModule} from '@angular/common/http'
import { MaterialModue } from '../shared/modules/material/material.module';
import { FormComponent } from "./components/form.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
const routes = [
    {
      path: 'form',
      component: FormComponent,
    },
  
  ]
@NgModule({
    imports: [
        HttpClientModule,
        CommonModule, 
        MaterialModue,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        MaterialModue,
        NoopAnimationsModule,
        FlexLayoutModule,
        
    ],
  declarations: [FormComponent],
})
export class FormModule {}