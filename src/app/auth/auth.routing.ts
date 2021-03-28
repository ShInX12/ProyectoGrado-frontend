import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { InboxComponent } from '../pages/inbox/inbox.component';
import { RegisterStepperComponent } from '../components/register-stepper/register-stepper.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterStepperComponent },
  { path: 'enviar', component: InboxComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
