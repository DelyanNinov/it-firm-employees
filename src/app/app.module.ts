import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormModule } from './form/form.module';
import { TableModule } from './table/table.module';
import { DatePipe } from '@angular/common';
import { HeaderModule } from './header/header.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthModule } from './auth/auth.module';

@NgModule({
<<<<<<< HEAD
  declarations: [
    AppComponent,
    
    
  ],
=======
  declarations: [AppComponent],
>>>>>>> 558852d228d4f17fa9ed0ce0133e842a0e9da379
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormModule,
    TableModule,
    HeaderModule,
    FlexLayoutModule,
<<<<<<< HEAD
   AuthModule
  ],
  bootstrap:[AppComponent]
=======
    LoginModule,
    RegisterModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
>>>>>>> 558852d228d4f17fa9ed0ce0133e842a0e9da379
})
export class AppModule {}
