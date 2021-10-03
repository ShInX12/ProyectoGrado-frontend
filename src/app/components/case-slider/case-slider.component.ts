import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Process } from '../../models/process';
import { Subscription } from 'rxjs';
import { ModalService } from '../../services/modal.service';
import { ProcessService } from '../../services/process.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-case-slider',
  templateUrl: './case-slider.component.html',
  styleUrls: ['./case-slider.component.scss']
})
export class CaseSliderComponent implements OnInit, OnDestroy {

  @Input() title: string;
  @Input() processType: string;
  @Input() url = '';
  @Input() client = false;
  public showButton = true;

  public processes: Process[] = [];
  public person: User;
  public assistantCode: string;
  public noData = false;

  public processesSub: Subscription;

  constructor(private modalService: ModalService,
              public authService: AuthService,
              public processService: ProcessService) { }

  ngOnInit(): void {
    if (this.client){
      this.findProcessByClient();
      this.showButton = false;
    } else {
      this.findProcessByUser();
      this.person = this.authService.person as User;
      this.assistantCode = environment.USER_TYPE_ASISTENTE;
    }
  }

  ngOnDestroy(): void {
    this.processesSub?.unsubscribe();
  }

  public openModal(): void {
    this.modalService.openProcess(this.processType);
  }

  public findProcessByUser(): void {
    this.processesSub = this.processService.findLastestByUser(this.processType).subscribe(
      processes => {
        this.processes = processes;
        if (processes?.length === 0){
          this.noData = true;
        }
      },
      error => console.warn(error.error.message)
    );
  }

  public findProcessByClient(): void {
    this.processesSub = this.processService.findLastestByClient(this.processType).subscribe(
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
