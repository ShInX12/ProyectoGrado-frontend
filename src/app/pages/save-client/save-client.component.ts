import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonalIdTypeService } from '../../services/personal-id-type.service';
import { showErrorAlert, showSuccesAlert } from '../../helpers/alerts';
import { ClientService } from '../../services/client.service';
import { PersonalIdType } from '../../models/personalIdType';
import { Subscription } from 'rxjs';
import { ModalService } from '../../services/modal.service';
import { AuthService } from '../../services/auth.service';
import { ClientDTO } from '../../DTO/clientDTO';
import { Client } from '../../models/client';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-save-client',
  templateUrl: './save-client.component.html',
  styleUrls: ['./save-client.component.css']
})
export class SaveClientComponent implements OnInit, OnDestroy {

  public client: Client = new Client('', '', '', '', '', '', '', '', true, '', this.authService.person.company_id, false);
  public personalIdTypes: PersonalIdType[] = [];

  @Output() newClient: EventEmitter<ClientDTO> = new EventEmitter();

  public saveClientForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    enable: new FormControl(true),
    personal_id_type: new FormControl(environment.DEAFULT_PERSONAL_ID_TYPE),
    personal_id: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    phone: new FormControl(''),
  });

  get name(): AbstractControl {
    return this.saveClientForm.get('name');
  }

  get email(): AbstractControl {
    return this.saveClientForm.get('email');
  }

  get password(): AbstractControl {
    return this.saveClientForm.get('password');
  }

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
    this.saveClientForm.reset({
      personal_id_type: environment.DEAFULT_PERSONAL_ID_TYPE,
      enable: true
    });
    this.modalService.close();
  }

  public save(): void {

    this.client.name = this.saveClientForm.get('name').value;
    this.client.enable = this.saveClientForm.get('enable').value;
    this.client.personal_id_type = this.saveClientForm.get('personal_id_type').value;
    this.client.personal_id = this.saveClientForm.get('personal_id').value;
    this.client.email = this.saveClientForm.get('email').value;
    this.client.password = this.saveClientForm.get('password').value;
    this.client.phone = this.saveClientForm.get('phone').value;

    this.saveClientSub = this.clientService.save(this.client).subscribe(
      clientDTO => {
        this.newClient.emit(clientDTO);
        showSuccesAlert('Cliente guardado correctamente', () => this.closeModal());
      },
      error => showErrorAlert('No se pudo crear el cliente', error.error.message, () => {})
    );
  }

  public findPersonalIdTypes(): void {
    this.personalIdSub = this.personalIdTypeService.findAll().subscribe(
      ({personal_id_types}) => this.personalIdTypes = personal_id_types,
      error => console.warn(error.error.message)
    );
  }

}
