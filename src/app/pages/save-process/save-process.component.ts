import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Process } from '../../models/process';
import { UserProcess } from '../../models/userProcess';
import { ModalService } from '../../services/modal.service';
import { ProcessService } from '../../services/process.service';
import { UserProcessService } from '../../services/user-process.service';
import { showErrorAlert } from '../../helpers/alerts';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProcessDTO } from '../../DTO/processDTO';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-save-process',
  templateUrl: './save-process.component.html',
  styleUrls: ['./save-process.component.scss']
})
export class SaveProcessComponent implements OnDestroy {

  public process: Process = new Process('', '', 0, '', '', '', false);

  @Input() url = '';
  @Output() newProcess: EventEmitter<ProcessDTO> = new EventEmitter();

  public saveProcessSub: Subscription;
  public userProcessSub: Subscription;

  constructor(public modalService: ModalService,
              public processService: ProcessService,
              public userProcessService: UserProcessService,
              public activatedRoute: ActivatedRoute,
              public router: Router) { }

  ngOnDestroy(): void {
    this.saveProcessSub?.unsubscribe();
    this.userProcessSub?.unsubscribe();
  }

  public closeModal(): void {
    this.modalService.close();
  }

  public save(): void {
    this.process.process_type = this.modalService.processType;
    this.process.state = environment.DEAFULT_ACTIVE_PROCESS_STATE;
    this.process.name = this.process.name.trim();
    this.process.description = this.process.description.trim();
    this.saveProcessSub = this.processService.save(this.process).subscribe(
      (processDTO) => {
        const userProcess = new UserProcess('0', '0', processDTO.uid, true, true);
        this.userProcessSub = this.userProcessService.save(userProcess).subscribe((value => {
          Swal.fire({
            icon: 'success',
            title: this.modalService.processTypeName[0].toUpperCase() + this.modalService.processTypeName.slice(1) + ' creado con éxito',
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Ver ' + this.modalService.processTypeName,
            showCancelButton: true,
            cancelButtonText: 'Aceptar',
          }).then(result => {
            this.newProcess.emit(processDTO);
            this.modalService.close();
            if (result.isConfirmed) {
              if (this.modalService.processTypeName === 'caso') {
                this.router.navigate([`${this.url}proceso/${processDTO.uid}`], {relativeTo: this.activatedRoute});
              } else {
                this.router.navigate([`${this.url}movimiento/${processDTO.uid}`], {relativeTo: this.activatedRoute});
              }
            }
          });
        }));
      }, (error) => showErrorAlert('Ha ocurrido un error', error.error.message, () => {})
    );
  }

}
