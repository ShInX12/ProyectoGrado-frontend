import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { ModalService } from '../../services/modal.service';
import { Subscription } from 'rxjs';
import { Client } from '../../models/client';

@Component({
  selector: 'app-home-client-list',
  templateUrl: './home-client-list.component.html',
  styleUrls: ['./home-client-list.component.css']
})
export class HomeClientListComponent implements OnInit, OnDestroy {

  public clients: Client[] = [];
  public noData = false;

  public clientsSub: Subscription;

  constructor(private modalService: ModalService,
              public clientService: ClientService) { }

  ngOnInit(): void {
    this.findClients();
  }

  ngOnDestroy(): void {
    this.clientsSub?.unsubscribe();
  }

  public openModal(): void {
    this.modalService.openClient();
  }

  public findClients(): void {
    this.clientsSub = this.clientService.findLastest().subscribe(
      clients => {
        this.clients = clients;
        if (clients?.length === 0){
          this.noData = true;
        }
      },
      error => console.log(error.error.message)
    );
  }

}
