import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { InboxComponent } from '../pages/inbox/inbox.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: SignUpComponent },
  { path: 'enviar', component: InboxComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
