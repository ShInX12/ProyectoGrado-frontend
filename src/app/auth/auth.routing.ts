import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { InboxComponent } from '../pages/inbox/inbox.component';
import { RegisterStepperComponent } from '../components/register-stepper/register-stepper.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterStepperComponent },
  { path: 'enviar', component: InboxComponent },
  { path: 'contrasena', component: ResetPasswordComponent },
  { path: 'contrasena/:token', component: ChangePasswordComponent },
  { path: 'verificar/:token', component: VerifyEmailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
