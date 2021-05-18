import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { Subscription } from 'rxjs';
import { Client } from '../../models/client';
import { Process } from '../../models/process';
import { AuthService } from '../../services/auth.service';
import { ClientService } from '../../services/client.service';
import { ProcessService } from '../../services/process.service';
import { PersonalIdType } from '../../models/personalIdType';
import { PersonalIdTypeService } from '../../services/personal-id-type.service';
import { showErrorAlert, showSuccesAlert, showWarningDeleteAlert } from '../../helpers/alerts';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit, OnDestroy {

  public params = this.activedRoute.params[`_value`];
  public client: Client = new Client('', '', '', '', '', '', '', '', true, '', '', false);
  public personalIdTypes: PersonalIdType[] = [];
  public processes: Process[] = [];
  public personalIdName = '';
  public noData = false;

  public subscriptions: Subscription[] = [];

  constructor(public router: Router,
              public activedRoute: ActivatedRoute,
              public clientService: ClientService,
              public authService: AuthService,
              public personalIdTypeService: PersonalIdTypeService,
              public processService: ProcessService,
              private fireStorage: AngularFireStorage) { }

  ngOnInit(): void {
    this.findClientById();
    this.findProcessByClient();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb?.unsubscribe());
  }

  public findClientById(): void {
    const findClientSub = this.clientService.findById(this.params.id).subscribe(
      client => {
        this.client = client;
        this.findPersonalIdTypes();
      },
      error => console.warn(error.error.message)
    );
    this.subscriptions.push(findClientSub);
  }

  public findProcessByClient(): void {
    const findProcessSub = this.processService.findByClientUser(this.params.id, this.authService.person.uid).subscribe(
      ({ processes }) => {
        this.processes = processes;
        if (processes?.length === 0) {
          this.noData = true;
        }
      },
      error => console.warn(error.error.message)
    );
    this.subscriptions.push(findProcessSub);
  }

  public findPersonalIdTypes(): void {
    const findPersonalIdSub = this.personalIdTypeService.findAll().subscribe(
      ({personal_id_types}) => {
        this.personalIdTypes = personal_id_types;
        personal_id_types.forEach(id => {
          if (id.uid === this.client.personal_id_type){
            this.personalIdName = id.name;
          }
        });
      },
      error => console.warn(error.error.message)
    );
    this.subscriptions.push(findPersonalIdSub);
  }

  // public updateClient(): void {
  //   const updateClientSub = this.clientService.update(this.client).subscribe(
  //     client => {
  //       this.client = client;
  //       showSuccesAlert('Cliente actualizado correctamente', () => {});
  //     },
  //     error => showErrorAlert('No se pudo actualizar el cliente', error.error.message, () => {})
  //   );
  //   this.subscriptions.push(updateClientSub);
  // }

  public deleteClient(): void {
    showWarningDeleteAlert('¿Desea eliminar el cliente?', 'Esta acción no se puede deshacer', result => {
      if (result.isConfirmed) {
        const deleteClientSub = this.clientService.delete(this.client.uid).subscribe(
          () => {
            if (this.client?.photo_url?.trim().length > 0) { this.fireStorage.refFromURL(this.client.photo_url).delete(); }
            showSuccesAlert(
              'Cliente eliminado',
              () => this.router.navigate(['../../clientes'], { relativeTo: this.activedRoute })
            );
          },
          error => showErrorAlert('No se pudo eliminar el cliente', error.error.message, () => {})
        );
        this.subscriptions.push(deleteClientSub);
      }
    });
  }

}
