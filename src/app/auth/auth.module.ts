import { CommonModule } from '@angular/common';
import { LoginComponent } from '../auth/components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthPageComponent } from './components/auth-page/auth-page.component';
import { MaterialModule } from '../shared/modules/material/material.module';
import { RouterModule } from '@angular/router';
import { HasUserGuard } from '../shared/services/guards/hasUser.guard';
const routes = [
  {
    path: '',
    component: AuthPageComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [HasUserGuard],
  },
];
@NgModule({
  declarations: [AuthPageComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ],
})
export class AuthModule {}
