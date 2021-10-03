import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Process } from '../../models/process';
import { Document } from '../../models/document';
import { Subscription } from 'rxjs';
import { ClientNameDTO } from '../../DTO/client-nameDTO';
import { ClientService } from '../../services/client.service';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-case-card',
  templateUrl: './case-card.component.html',
  styleUrls: ['./case-card.component.scss']
})
export class CaseCardComponent implements OnInit, OnDestroy {

  @Input() process: Process = new Process('', '', 0, '', '', '', false);
  @Input() url = '';
  public clients: ClientNameDTO[] = [];
  public documents: Document[] = [];
  public clientsLabel = '';

  public clientsSub: Subscription;
  public documentsSub: Subscription;

  constructor(public router: Router,
              public clientService: ClientService,
              public documentService: DocumentService) { }

  ngOnInit(): void {
    this.findClientsByProcess();
    this.findDocumentsByProcess();
  }

  ngOnDestroy(): void {
    this.clientsSub?.unsubscribe();
    this.documentsSub?.unsubscribe();
  }

  public findClientsByProcess(): void {
    this.clientsSub = this.clientService.findNameDTOByProcess(this.process.uid).subscribe(
      clientsNameDTO => {
        this.clients = clientsNameDTO;
        this.createClientsLabel();
      },
      error => console.warn(error.error.message)
    );
  }

  public findDocumentsByProcess(): void {
    this.documentsSub = this.documentService.findLastestByProcess(this.process.uid).subscribe(
      documents => this.documents = documents,
      error => console.warn(error.error)
    );
  }

  public createClientsLabel(): void {
    if (this.clients.length > 0) {
      this.clients.forEach(client => this.clientsLabel += client.name + ', ');
      this.clientsLabel = this.clientsLabel.slice(0, -2);
    } else {
      this.clientsLabel = '(Sin clientes)';
    }
  }

}
