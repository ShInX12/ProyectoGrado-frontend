import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Client } from '../../models/client';
import { PersonalIdType } from '../../models/personalIdType';
import { ClientService } from '../../services/client.service';
import { ModalService } from '../../services/modal.service';
import { PersonalIdTypeService } from '../../services/personal-id-type.service';
import { showErrorAlert, showSuccesAlert } from '../../helpers/alerts';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-save-client',
  templateUrl: './save-client.component.html',
  styleUrls: ['./save-client.component.css']
})
export class SaveClientComponent implements OnInit, OnDestroy {

  public defaultDocumentType = environment.DEFAULT_DOCUMENT_TYPE;

  public client: Client = new Client('', '', '', '', '', '', true, this.defaultDocumentType, this.authService.user.company_id);
  public personalIdTypes: PersonalIdType[] = [];

  public saveClientSub: Subscription;
  public personalIdSub: Subscription;

  constructor(public modalService: ModalService,
              public clientService: ClientService,
              public authService: AuthService,
              public personalIdTypeService: PersonalIdTypeService) { }

  ngOnInit(): void {
    this.findPersonalIdTypes();
  }

  ngOnDestroy(): void {
    this.saveClientSub?.unsubscribe();
    this.personalIdSub?.unsubscribe();
  }

  public closeModal(): void {
    this.client.uid = '';
    this.client.name = '';
    this.client.bio = '';
    this.client.phone = '';
    this.client.personal_id = '';
    this.modalService.close();
  }

  public save(): void {
    this.saveClientSub = this.clientService.save(this.client).subscribe(
      value => showSuccesAlert('Cliente guardado correctamente', () => this.closeModal()),
      error => showErrorAlert('No se pudo crear el cliente', error.error.message, () => {})
    );
  }

  public findPersonalIdTypes(): void {
    this.personalIdSub = this.personalIdTypeService.findAll().subscribe(
      ({personal_id_types}) => this.personalIdTypes = personal_id_types,
      error => console.log(error.error.message)
    );
  }

}
