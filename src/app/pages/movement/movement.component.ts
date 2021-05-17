import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { Subscription } from 'rxjs';

import { State } from '../../models/state';
import { Client } from '../../models/client';
import { Process } from '../../models/process';

import { StateService } from '../../services/state.service';
import { ClientService } from '../../services/client.service';
import { ProcessService } from '../../services/process.service';
import { SnackbarService } from '../../services/snackbar.service';
import { DocumentService } from '../../services/document.service';
import { ClientProcessService } from '../../services/client-process.service';

import { toProcess } from '../../mapper/process-mapper';
import { ProcessDTO } from '../../DTO/processDTO';
import { showErrorAlert, showSuccesAlert, showWarningDeleteAlert } from '../../helpers/alerts';

@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.css']
})
export class MovementComponent implements OnInit, OnDestroy {

  public params = this.activedRoute.params[`_value`];

  public process: Process = new Process('1', '', 0, '', '', '', false);
  public currentClients: Client[] = [];
  public states: State[] = [];
  public totalClients: Client[] = [];

  public clientsLabel = '';
  public selectedClient: string;
  public stateName: string;

  public subscriptions: Subscription[] = [];

  modalRef: BsModalRef;

  constructor(public router: Router,
              public activedRoute: ActivatedRoute,
              private modalService: BsModalService,
              private fireStorage: AngularFireStorage,
              public stateService: StateService,
              public clientService: ClientService,
              public processService: ProcessService,
              public documentService: DocumentService,
              public snackbarService: SnackbarService,
              public clientProcessService: ClientProcessService) { }

  ngOnInit(): void {
    this.findProcessById();
    this.findClientsByProcess();
    this.findAllClients();
    this.findStates();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb?.unsubscribe());
  }

  public findProcessById(): void {
    const findProcessByIdSub = this.processService.findByIdDTO(this.params.id).subscribe(
      (processDTO: ProcessDTO) => {
        this.process = toProcess(processDTO);
        this.stateName = processDTO.state.name;
      }, () => {
        this.snackbarService.showSnackBar('El movimiento no existe');
        this.router.navigateByUrl('/movimientos');
      });
    this.subscriptions.push(findProcessByIdSub);
  }

  public findClientsByProcess(): void {
    const clientsByProcessSub = this.clientService.findByProcess(this.params.id).subscribe(clients => {
      this.currentClients = clients;
      this.clientsLabel = '';
      clients.forEach(client => this.clientsLabel += client.name + ', ');
      this.clientsLabel = this.clientsLabel.slice(0, -2);
    }, error => console.warn(error.error.message));
    this.subscriptions.push(clientsByProcessSub);
  }

  public findAllClients(): void {
    const clientsSub = this.clientService.findAll().subscribe(
      ({clients}) => this.totalClients = clients,
      error => console.warn(error.error.message)
    );
    this.subscriptions.push(clientsSub);
  }

  public findStates(): void {
    const statesSub = this.stateService.findAll().subscribe(({states}) => this.states = states);
    this.subscriptions.push(statesSub);
  }

  public addClient(): void {
    const clientProcessSub = this.clientProcessService.save(this.selectedClient, this.params.id).subscribe(
      () => this.findClientsByProcess(),
      error => this.snackbarService.showSnackBar(error.error.message)
    );
    this.subscriptions.push(clientProcessSub);
  }

  public updateProcess(): void {
    const updateProcessSub = this.processService.update(this.process).subscribe(
      () => {
        this.findProcessById();
        showSuccesAlert('Caso actualizado', () => this.modalRef.hide());
      },
      error => showErrorAlert('Error al actualizar el proceso', error.error.message, () => {})
    );
    this.subscriptions.push(updateProcessSub);
  }

  public deleteClient(id: string): void {
    const deleteClientProcessSub = this.clientProcessService.delete(id, this.params.id).subscribe(
      () => this.findClientsByProcess(),
      error => this.snackbarService.showSnackBar(error.error.message)
    );
    this.subscriptions.push(deleteClientProcessSub);
  }

  public deleteProcess(): void {

    showWarningDeleteAlert(
      '¿Desea eliminar el movimiento?',
      'Esta acción no se puede deshacer y eliminará los documentos y las observaciones asociadas',
      (result) => {
        if (result.isConfirmed) {
          this.deleteDocuments();
          const deleteProcessSub = this.processService.delete(this.params.id).subscribe(
            () => {
              showSuccesAlert('Movimiento eliminado', () => {
                this.modalRef.hide();
                this.router.navigate(['../../movimientos'], { relativeTo: this.activedRoute });
              });
            },
            error => showErrorAlert('No se pudo eliminar el movimiento', error.error.message, () => {})
          );
          this.subscriptions.push(deleteProcessSub);
        }
      }
    );
  }

  public deleteDocuments(): void {
    const deleteDocs = this.documentService.findByProcess(this.params.id).subscribe(
      documents => documents.forEach(document => this.fireStorage.refFromURL(document.url).delete()),
      error => console.warn(error.error.message)
    );
    this.subscriptions.push(deleteDocs);
  }

  public openModal(modal: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(modal, {class: 'modal-lg modal-dialog-scrollable'});
  }

}
