import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProcessService } from '../../services/process.service';
import { ModalService } from '../../services/modal.service';
import { environment } from '../../../environments/environment';
import { Subscription } from 'rxjs';
import { ProcessDTO } from '../../DTO/processDTO';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.scss']
})
export class ProcessListComponent implements OnInit, OnDestroy {

  public processes: ProcessDTO[] = [];
  public person: User;
  public assistantCode: string;

  public noData = false;

  public page = 1;
  public from: number;
  public to: number;
  public totalCount: number;
  public totalPages: number;

  public processSub: Subscription;

  constructor(private modalService: ModalService,
              public authService: AuthService,
              public processService: ProcessService) { }

  ngOnInit(): void {
    this.findProcessByUser();
    this.person = this.authService.person as User;
    this.assistantCode = environment.USER_TYPE_ASISTENTE;
  }

  ngOnDestroy(): void {
    this.processSub?.unsubscribe();
  }

  public findProcessByUser(): void {
    this.processSub = this.processService.findDTOByUserToken(environment.CASE_CODE, this.page).subscribe(
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
    this.modalService.openProcess(environment.CASE_CODE);
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

  public addNewProcess(process: ProcessDTO): void {
    this.processes.push(process);
    this.to++;
    this.totalCount++;
  }
}
