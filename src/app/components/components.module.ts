import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthModule } from '../auth/auth.module';
import { FilesBoxComponent } from './files-box/files-box.component';
import { CaseCardComponent } from './case-card/case-card.component';
import { FileCardComponent } from './file-card/file-card.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { CaseSliderComponent } from './case-slider/case-slider.component';
import { ClientCardComponent } from './client-card/client-card.component';
import { ObservationComponent } from './observation/observation.component';
import { HomeClientListComponent } from './home-client-list/home-client-list.component';
import { ObservationsBoxComponent } from './observations-box/observations-box.component';
import { RegisterStepperComponent } from './register-stepper/register-stepper.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { MessageTileComponent } from './message-tile/message-tile.component';


@NgModule({
  declarations: [
    FilesBoxComponent,
    CaseCardComponent,
    FileCardComponent,
    SearchBarComponent,
    CaseSliderComponent,
    ClientCardComponent,
    ObservationComponent,
    HomeClientListComponent,
    ObservationsBoxComponent,
    RegisterStepperComponent,
    ChatBoxComponent,
    MessageTileComponent
  ],
    exports: [
        FilesBoxComponent,
        CaseCardComponent,
        FileCardComponent,
        SearchBarComponent,
        CaseSliderComponent,
        ObservationComponent,
        HomeClientListComponent,
        ObservationsBoxComponent,
        ChatBoxComponent
    ],
  imports: [
    AuthModule,
    FormsModule,
    ModalModule,
    CommonModule,
    RouterModule
  ]
})
export class ComponentsModule { }
