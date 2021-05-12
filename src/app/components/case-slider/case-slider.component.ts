import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Process } from '../../models/process';
import { Subscription } from 'rxjs';
import { ModalService } from '../../services/modal.service';
import { ProcessService } from '../../services/process.service';

@Component({
  selector: 'app-case-slider',
  templateUrl: './case-slider.component.html',
  styleUrls: ['./case-slider.component.css']
})
export class CaseSliderComponent implements OnInit, OnDestroy {

  @Input() title: string;
  @Input() processType: string;
  @Input() url = '';

  public processes: Process[] = [];
  public noData = false;

  public processesSub: Subscription;

  constructor(private modalService: ModalService,
              public processService: ProcessService) { }

  ngOnInit(): void {
    this.findProcessByUser();
  }

  ngOnDestroy(): void {
    this.processesSub?.unsubscribe();
  }

  public openModal(): void {
    this.modalService.openProcess(this.processType);
  }

  public findProcessByUser(): void {
    this.processesSub = this.processService.findLastest(this.processType).subscribe(
      processes => {
        this.processes = processes;
        if (processes?.length === 0){
          this.noData = true;
        }
      },
      error => console.warn(error.error.message)
    );
  }
}
