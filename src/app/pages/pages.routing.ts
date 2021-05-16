import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';
import { LawyerGuard } from '../guards/lawyer.guard';
import { AssistantGuard } from '../guards/assistant.guard';
import { ClientGuard } from '../guards/client.guard';
import { UserDisabledComponent } from './user-disabled/user-disabled.component';

const routes: Routes = [
  { path: '', redirectTo: 'administrador', pathMatch: 'full'},
  {
    path: 'inactividad', component: UserDisabledComponent
  },
  {
    path: 'administrador', component: PagesComponent,
    canActivate: [AuthGuard, AdminGuard],
    canLoad: [AuthGuard, AdminGuard],
    loadChildren: () => import('./child-routes/admin-routes.module')
      .then(module => module.AdminRoutesModule)
  },
  {
    path: 'abogado', component: PagesComponent,
    canActivate: [AuthGuard, LawyerGuard],
    canLoad: [AuthGuard, LawyerGuard],
    loadChildren: () => import('./child-routes/lawyer-routes.module')
      .then(module => module.LawyerRoutesModule)
  },
  {
    path: 'asistente', component: PagesComponent,
    canActivate: [AuthGuard, AssistantGuard],
    canLoad: [AuthGuard, AssistantGuard],
    loadChildren: () => import('./child-routes/assistant-routes.module')
      .then(module => module.AssistantRoutesModule)
  },
  {
    path: 'cliente', component: PagesComponent,
    canActivate: [AuthGuard, ClientGuard],
    canLoad: [AuthGuard, ClientGuard],
    loadChildren: () => import('./child-routes/client-routes.module')
      .then(module => module.ClientRoutesModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
