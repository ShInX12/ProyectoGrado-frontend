import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProcessService } from '../../services/process.service';
import { ModalService } from '../../services/modal.service';
import { environment } from '../../../environments/environment';
import { Process } from '../../models/process';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.css']
})
export class ProcessListComponent implements OnInit, OnDestroy {

  public processes: Process[] = [];

  public loading = true;
  public noData = false;

  public page = 1;
  public from: number;
  public to: number;
  public totalCount: number;
  public totalPages: number;

  public processSub: Subscription;

  constructor(private modalService: ModalService,
              public processService: ProcessService) {
  }

  ngOnInit(): void {
    this.findProcessByUser();
  }

  ngOnDestroy(): void {
    this.processSub.unsubscribe();
  }

  public findProcessByUser(): void {
    this.processSub = this.processService.findByUserToken(environment.CASE_CODE, this.page).subscribe(
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
}
