import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientDTO } from '../../DTO/clientDTO';
import { ModalService } from '../../services/modal.service';
import { Subscription } from 'rxjs';
import { ClientService } from '../../services/client.service';
import { showErrorAlert, showSuccesAlert, showWarningDeleteAlert } from '../../helpers/alerts';
import { AuthService } from '../../services/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit, OnDestroy {

  public clients: ClientDTO[] = [];

  public loading = true;
  public noData = false;

  public page = 1;
  public from: number;
  public to: number;
  public totalCount: number;
  public totalPages: number;

  public clientsSub: Subscription;

  constructor(public clientService: ClientService,
              public authService: AuthService,
              public router: Router,
              private fireStorage: AngularFireStorage,
              private modalService: ModalService) { }

  ngOnInit(): void {
    this.findClients();
  }

  ngOnDestroy(): void {
    this.clientsSub?.unsubscribe();
  }

  public newClient(): void {
    this.modalService.openClient();
  }

  public findClients(): void {
    this.clientsSub = this.clientService.findAllPaginatedDTOByCompany(this.authService.company.uid, this.page).subscribe(
      ({clients, from, to, total_count, total_pages}) => {
        this.clients = clients;
        this.from = from;
        this.to = to;
        this.totalCount = total_count;
        this.totalPages = total_pages;

        if (clients?.length === 0){
          this.noData = true;
        }
      }
    );
  }

  public deleteClient(name: string, uid: string, photoUrl: string, event): void {

    event.stopPropagation();
    showWarningDeleteAlert(
      '¿Desea eliminar el cliente?',
      `${name}`,
      (result) => {
        if (result.isConfirmed) {
          this.clientService.delete(uid).subscribe(
            () => {
              if (photoUrl.trim().length > 0) { this.fireStorage.refFromURL(photoUrl).delete(); }
              this.clients = this.clients.filter(client => client.uid !== uid);
              this.to--;
              this.totalCount--;
              showSuccesAlert('Cliente eliminado', () => {});
            },
            error => showErrorAlert('No se pudo eliminar el cliente', error.error.message, () => {})
          );
        }
      }
    );
  }

  public changePage(newPage: number): void {
    this.page = newPage;
    if (this.page <= 0) {
      this.page = 1;
    } else if (newPage > this.totalPages) {
      this.page = this.totalPages;
    }
    this.findClients();
  }

  addClient(client: ClientDTO): void {
    this.clients.push(client);
    this.to++;
    this.totalCount++;
  }
}
