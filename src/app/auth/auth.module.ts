
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../auth/components/login/login.component';
import { LoginPageComponent } from '../auth/components/login/login-page.component';
import { RegisterComponent } from './components/register/register.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginPageComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
})
export class AuthModule {}