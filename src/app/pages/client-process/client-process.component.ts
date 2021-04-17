import { Component, OnDestroy, OnInit } from '@angular/core';
import { Process } from '../../models/process';
import { Document } from '../../models/document';
import { Subscription } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { ProcessService } from '../../services/process.service';
import { DocumentService } from '../../services/document.service';
import { SnackbarService } from '../../services/snackbar.service';
import { ProcessDTO } from '../../DTO/processDTO';
import { toProcess } from '../../mapper/process-mapper';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client';

@Component({
  selector: 'app-client-process',
  templateUrl: './client-process.component.html',
  styleUrls: ['./client-process.component.css']
})
export class ClientProcessComponent implements OnInit, OnDestroy {

  public params = this.activedRoute.params[`_value`];

  public process: Process = new Process('0', '', 0, '', '', '');
  public currentClients: Client[] = [];
  public clientDocuments: Document[] = [];

  public clientsLabel = '';
  public stateName: string;

  public subscriptions: Subscription[] = [];

  modalRef: BsModalRef;

  constructor(public router: Router,
              public activedRoute: ActivatedRoute,
              private modalService: BsModalService,
              private fireStorage: AngularFireStorage,
              public clientService: ClientService,
              public processService: ProcessService,
              public documentService: DocumentService,
              public snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.findProcessById();
    this.findDocumentsByProcess();
    this.findClientsByProcess();
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

  public findDocumentsByProcess(): void {
    const documentsByProcessSub = this.documentService.findByProcess(this.params.id).subscribe(
      documents => this.clientDocuments = documents.filter(doc => doc.from_lawyer === false),
      error => console.warn(error.error.message)
    );
    this.subscriptions.push(documentsByProcessSub);
  }

  public deleteDocument(uid: string): void {
    this.clientDocuments = this.clientDocuments.filter(doc => doc.uid !== uid);
  }

}
