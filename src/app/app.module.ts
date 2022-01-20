import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormModule } from './form/form.module';
import { TableComponent } from './table/components/table/table.component';
import { TableModule } from './table/table.module';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormModule,
    TableModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { } 
