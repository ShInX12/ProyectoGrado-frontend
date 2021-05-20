import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LawyerHomeComponent } from '../lawyer-home/lawyer-home.component';
import { ProcessListComponent } from '../process-list/process-list.component';
import { ProcessComponent } from '../process/process.component';
import { MovementListComponent } from '../movement-list/movement-list.component';
import { MovementComponent } from '../movement/movement.component';
import { ClientListComponent } from '../client-list/client-list.component';
import { ClientComponent } from '../client/client.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { UserListComponent } from '../user-list/user-list.component';
import { UserComponent } from '../user/user.component';
import { CompanyComponent } from '../company/company.component';
import { CalendarComponent } from '../calendar/calendar.component';

const adminRoutes: Routes = [
  { path: '', component: LawyerHomeComponent },
  { path: 'procesos', component: ProcessListComponent },
  { path: 'proceso/:id', component: ProcessComponent },
  { path: 'movimientos', component: MovementListComponent },
  { path: 'movimiento/:id', component: MovementComponent },
  { path: 'clientes', component: ClientListComponent },
  { path: 'cliente/:id', component: ClientComponent },
  { path: 'perfil', component: UserProfileComponent },
  { path: 'usuarios', component: UserListComponent },
  { path: 'usuario/:id', component: UserComponent },
  { path: 'compania', component: CompanyComponent },
  { path: 'calendario', component: CalendarComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes)
  ],
  exports: [RouterModule]
})
export class AdminRoutesModule { }
