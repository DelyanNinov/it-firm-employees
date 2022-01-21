import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from '../app/auth/components/login/login-page.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { TableComponent } from './table/components/table/table.component';

const routes: Routes = [
  {path: 'login',component: LoginPageComponent},
  {path: 'register' , component: RegisterComponent},
  {path: 'table', component: TableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
