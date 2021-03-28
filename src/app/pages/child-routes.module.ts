import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProcessListComponent } from './process-list/process-list.component';
import { ProcessComponent } from './process/process.component';
import { MovementListComponent } from './movement-list/movement-list.component';
import { MovementComponent } from './movement/movement.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientComponent } from './client/client.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const childRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'procesos', component: ProcessListComponent },
  { path: 'proceso/:id', component: ProcessComponent },
  { path: 'movimientos', component: MovementListComponent },
  { path: 'movimiento/:id', component: MovementComponent },
  { path: 'clientes', component: ClientListComponent },
  { path: 'cliente/:id', component: ClientComponent },
  { path: 'perfil', component: UserProfileComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(childRoutes)
  ],
  exports: [RouterModule]
})
export class ChildRoutesModule { }