import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';

import { ComponentsModule } from '../components/components.module';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    ComponentsModule
  ],
  exports: [
    NavbarComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
