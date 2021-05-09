import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { Subscription } from 'rxjs';

import { State } from '../../models/state';
import { Client } from '../../models/client';
import { Process } from '../../models/process';
import { Document } from '../../models/document';

import { StateService } from '../../services/state.service';
import { ClientService } from '../../services/client.service';
import { ProcessService } from '../../services/process.service';
import { SnackbarService } from '../../services/snackbar.service';
import { DocumentService } from '../../services/document.service';
import { ClientProcessService } from '../../services/client-process.service';

import { showErrorAlert, showSuccesAlert, showWarningDeleteAlert } from '../../helpers/alerts';
import { ProcessDTO } from '../../DTO/processDTO';
import { toProcess } from '../../mapper/process-mapper';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit, OnDestroy {

  public params = this.activedRoute.params[`_value`];

  public process: Process = new Process('0', '', 0, '', '', '', false);
  public currentClients: Client[] = [];
  public states: State[] = [];
  public totalClients: Client[] = [];
  public documentsReceived: Document[] = [];

  public clientsLabel = '';
  public stateName: string;
  public selectedClient: string;
  public reloadChatBox = false;

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
              public chatService: ChatService,
              public clientProcessService: ClientProcessService) { }

  ngOnInit(): void {
    this.findProcessById();
    this.findClientsByProcess();
    this.findDocumentsByProcess();
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
        this.snackbarService.showSnackBar('El proceso no existe');
        this.router.navigateByUrl('/procesos');
      });

    this.subscriptions.push(findProcessByIdSub);
  }

  public findClientsByProcess(): void {
    const clientsByProcessSub = this.clientService.findByProcess(this.params.id).subscribe(clients => {
      this.currentClients = clients;
      this.clientsLabel = '';
      clients.forEach(client => this.clientsLabel += client.name + ', ');
      this.clientsLabel = this.clientsLabel.slice(0, -2);
    });
    this.subscriptions.push(clientsByProcessSub);
  }

  public findAllClients(): void {
    const clientsSub = this.clientService.findAll().subscribe(({clients}) => this.totalClients = clients);
    this.subscriptions.push(clientsSub);
  }

  public findDocumentsByProcess(): void {
    const documentsByProcessSub = this.documentService.findByProcess(this.params.id).subscribe(
      documents => this.documentsReceived = documents.filter(doc => doc.from_lawyer === false),
      error => console.warn(error.error.message)
    );
    this.subscriptions.push(documentsByProcessSub);
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
      process => {
        this.process = process;
        showSuccesAlert('Caso Actualizado', () => this.modalRef.hide());
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
      '¿Desea eliminar el proceso?',
      'Esta acción no se puede deshacer y eliminará los documentos y las observaciones asociadas',
      (result) => {
        if (result.isConfirmed) {
          this.deleteDocuments();
          const deleteProcessSub = this.processService.delete(this.params.id).subscribe(
            () => {
              showSuccesAlert('Proceso eliminado', () => {
                this.modalRef.hide();
                this.router.navigate(['../../procesos'], { relativeTo: this.activedRoute });
              });
            },
            error => showErrorAlert('No se pudo eliminar el proceso', error.error.message, () => {})
          );
          this.subscriptions.push(deleteProcessSub);
        }
      }
    );
  }

  public deleteDocument(uid: string): void {
    this.documentsReceived = this.documentsReceived.filter(doc => doc.uid !== uid);
  }

  public deleteDocuments(): void {
    const deleteDocs = this.documentService.findByProcess(this.params.id).subscribe(
      documents => documents.forEach(document => this.fireStorage.refFromURL(document.url).delete()),
      error => console.warn(error.error.message)
    );
    this.subscriptions.push(deleteDocs);
  }

  public openModal(modal: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(modal, {class: 'modal-lg'});
  }

  public deleteMessages(): void {
    const deleteMessages = this.chatService.deleteMessagesByProcess(this.params.id).subscribe(
      () => showSuccesAlert('Mensajes eliminados', () => {
        this.modalRef.hide();
        this.reloadChatBox = !this.reloadChatBox;
      }),
      error => showErrorAlert('No se lograron eliminar los mensajes', error.error.message, () => {})
    );
    this.subscriptions.push(deleteMessages);
  }

  public enableChat(): void {
    this.process.enable_chat = true;
  }
}
