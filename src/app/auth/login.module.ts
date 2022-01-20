import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {HttpClientModule} from '@angular/common/http'
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from '../shared/modules/material/material.module';
import { LoginComponent } from "./components/login/login.component";



  
@NgModule({
    imports: [
        CommonModule, 
        MaterialModule,
        HttpClientModule,
        
        ReactiveFormsModule,
        NoopAnimationsModule,
        FlexLayoutModule,
        RouterModule
       
        
    ],
    exports: [LoginComponent],
  declarations: [LoginComponent],
})
export class LoginModule {}