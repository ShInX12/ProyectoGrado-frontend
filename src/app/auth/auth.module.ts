import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterUserComponent } from './register-user/register-user.component';
import { LoginComponent } from './login/login.component';
import { RegisterCompanyComponent } from './register-company/register-company.component';
import { RegisterUserDetailsComponent } from './register-user-details/register-user-details.component';


@NgModule({
  declarations: [LoginComponent, RegisterUserComponent, RegisterCompanyComponent, RegisterUserDetailsComponent],
  exports: [
    RegisterCompanyComponent,
    RegisterUserComponent,
    RegisterUserDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
