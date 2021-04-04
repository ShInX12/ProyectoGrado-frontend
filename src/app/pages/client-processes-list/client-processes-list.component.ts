import { Component, OnDestroy, OnInit } from '@angular/core';
import { Process } from '../../models/process';
import { Subscription } from 'rxjs';
import { ProcessService } from '../../services/process.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-client-processes-list',
  templateUrl: './client-processes-list.component.html',
  styleUrls: ['./client-processes-list.component.css']
})
export class ClientProcessesListComponent implements OnInit, OnDestroy {

  public processes: Process[] = [];

  public loading = true;
  public noData = false;

  public page = 1;
  public from: number;
  public to: number;
  public totalCount: number;
  public totalPages: number;

  public processSub: Subscription;

  constructor(public processService: ProcessService,
              public authService: AuthService) { }

  ngOnInit(): void {
    this.findProcessByClient();
  }

  ngOnDestroy(): void {
    this.processSub?.unsubscribe();
  }

  public findProcessByClient(): void {
    this.processSub = this.processService.findByClient(this.authService.person.uid).subscribe(
      ({processes, from, to, total_count, total_pages}) => {
        this.processes = processes;
        this.from = from;
        this.to = to;
        this.totalCount = total_count;
        this.totalPages = total_pages;

        console.log(this.authService.person.uid);
        console.log(processes);

        if (processes?.length === 0) {
          this.noData = true;
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
    this.findProcessByClient();
  }

}
