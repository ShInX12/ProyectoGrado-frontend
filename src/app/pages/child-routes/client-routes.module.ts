import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ClientProcessesListComponent } from '../client-processes-list/client-processes-list.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { ClientHomeComponent } from '../client-home/client-home.component';
import { ClientProcessComponent } from '../client-process/client-process.component';

const clientRoutes: Routes = [
  { path: '', component: ClientHomeComponent },
  { path: 'procesos', component: ClientProcessesListComponent },
  { path: 'proceso/:id', component: ClientProcessComponent },
  { path: 'perfil', component: UserProfileComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(clientRoutes)
  ],
  exports: [RouterModule]
})
export class ClientRoutesModule { }
