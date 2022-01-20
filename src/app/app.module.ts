import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormModule } from './form/form.module';
import { TableModule } from './table/table.module';
import { DatePipe } from '@angular/common';
import { HeaderModule } from './header/header.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginModule } from './auth/login.module';
import { RegisterModule } from './auth/register.module';




@NgModule({
<<<<<<< HEAD
  declarations: [
    AppComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormModule,
    TableModule,
    HeaderModule,
    FlexLayoutModule,
    LoginModule,
    RegisterModule
  ],
=======
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, FormModule, TableModule],
>>>>>>> cecb67eb8035df6b3cf037e493739d682122e9e8
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
