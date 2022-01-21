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
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';

@NgModule({
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
   AuthModule,
   provideFirebaseApp(() => initializeApp(environment.firebase)),
   provideAuth(() => getAuth())
  ],
  providers: [DatePipe],
  bootstrap:[AppComponent]
})
export class AppModule {}
