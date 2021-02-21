import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { HomeClientListComponent } from './home-client-list/home-client-list.component';
import { ObservationComponent } from './observation/observation.component';
import { CaseSliderComponent } from './case-slider/case-slider.component';
import { ClientCardComponent } from './client-card/client-card.component';
import { CaseCardComponent } from './case-card/case-card.component';
import { FileCardComponent } from './file-card/file-card.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ObservationsBoxComponent } from './observations-box/observations-box.component';
import { FilesBoxComponent } from './files-box/files-box.component';


@NgModule({
  declarations: [
    HomeClientListComponent,
    ObservationComponent,
    CaseSliderComponent,
    ClientCardComponent,
    CaseCardComponent,
    FileCardComponent,
    SearchBarComponent,
    ObservationsBoxComponent,
    FilesBoxComponent
  ],
  exports: [
    HomeClientListComponent,
    ObservationComponent,
    CaseSliderComponent,
    CaseCardComponent,
    FileCardComponent,
    SearchBarComponent,
    ObservationsBoxComponent,
    FilesBoxComponent
  ],
  imports: [
    CommonModule,
    ModalModule,
    FormsModule
  ]
})
export class ComponentsModule { }
