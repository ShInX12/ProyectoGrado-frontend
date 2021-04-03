import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientDTO } from '../../DTO/clientDTO';
import { ModalService } from '../../services/modal.service';
import { Subscription } from 'rxjs';
import { ClientService } from '../../services/client.service';
import { showErrorAlert, showSuccesAlert, showWarningDeleteAlert } from '../../helpers/alerts';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
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
              public router: Router,
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
    this.clientsSub = this.clientService.findAllPaginatedDTO(this.page).subscribe(
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

  public deleteClient(name: string, uid: string, event): void {

    event.stopPropagation();
    showWarningDeleteAlert(
      '¿Desea eliminar el cliente?',
      `${name}`,
      (result) => {
        if (result.isConfirmed) {
          this.clientService.delete(uid).subscribe(
            () => {
              this.clients = this.clients.filter(client => client.uid !== uid);
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

}
