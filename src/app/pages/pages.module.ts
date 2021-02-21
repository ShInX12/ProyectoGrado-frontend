import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';

import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { ProcessComponent } from './process/process.component';
import { ProcessListComponent } from './process-list/process-list.component';
import { MovementComponent } from './movement/movement.component';
import { MovementListComponent } from './movement-list/movement-list.component';
import { ClientComponent } from './client/client.component';
import { ClientListComponent } from './client-list/client-list.component';
import { InboxComponent } from './inbox/inbox.component';
import { SaveProcessComponent } from './save-process/save-process.component';
import { SaveClientComponent } from './save-client/save-client.component';
import { FormsModule } from '@angular/forms';
import { UserProfileComponent } from './user-profile/user-profile.component';


@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    ProcessComponent,
    ProcessListComponent,
    MovementComponent,
    MovementListComponent,
    ClientComponent,
    ClientListComponent,
    InboxComponent,
    SaveProcessComponent,
    SaveClientComponent,
    UserProfileComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        ComponentsModule,
        FormsModule
    ]
})
export class PagesModule { }
