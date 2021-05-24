import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProcessService } from '../../services/process.service';
import { ModalService } from '../../services/modal.service';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Process } from '../../models/process';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-movement-list',
  templateUrl: './movement-list.component.html',
  styleUrls: ['./movement-list.component.css']
})
export class MovementListComponent implements OnInit, OnDestroy {

  public processes: Process[] = [];
  public person: User;
  public assistantCode: string;

  public loading = true;
  public noData = false;

  public page = 1;
  public from: number;
  public to: number;
  public totalCount: number;
  public totalPages: number;

  public processesSub: Subscription;

  constructor(private modalService: ModalService,
              public authService: AuthService,
              public processService: ProcessService) { }

  ngOnInit(): void {
    this.findProcessByUser();
    this.person = this.authService.person as User;
    this.assistantCode = environment.USER_TYPE_ASISTENTE;
  }

  ngOnDestroy(): void {
    this.processesSub?.unsubscribe();
  }

  public findProcessByUser(): void {
    this.processesSub = this.processService.findByUserToken(environment.MOVEMENT_CODE, this.page).subscribe(
      ({processes, from, to, total_count, total_pages}) => {
        this.processes = processes;
        this.from = from;
        this.to = to;
        this.totalCount = total_count;
        this.totalPages = total_pages;

        if (processes?.length === 0) {
          this.noData = true;
        }
      }
    );
  }

  public newProcess(): void {
    this.modalService.openProcess(environment.MOVEMENT_CODE);
  }

  public changePage(newPage: number): void {
    this.page = newPage;
    if (this.page <= 0) {
      this.page = 1;
    } else if (newPage > this.totalPages) {
      this.page = this.totalPages;
    }
    this.findProcessByUser();
  }

  public addNewProcess(process: Process): void {
    this.processes.push(process);
    this.to++;
    this.totalCount++;
  }
}
