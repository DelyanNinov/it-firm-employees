import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {HttpClientModule} from '@angular/common/http'
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from '../shared/modules/material/material.module';
import { HeaderComponent } from "./components/header/header.component";


  
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
    exports: [HeaderComponent],
  declarations: [HeaderComponent],
})
export class HeaderModule {}