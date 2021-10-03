import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ObservationService } from '../../services/observation.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Subscription } from 'rxjs';
import { Observation } from '../../models/observation';

@Component({
  selector: 'app-observation',
  templateUrl: './observation.component.html',
  styleUrls: ['./observation.component.scss']
})
export class ObservationComponent implements OnDestroy {

  @Input() observation: Observation;
  @Input() disabled = false;
  @Output() deleteObservation: EventEmitter<string> = new EventEmitter();

  public deleteObservationSub: Subscription;

  constructor(public observationService: ObservationService,
              public snackbarService: SnackbarService) { }

  ngOnDestroy(): void {
    this.deleteObservationSub?.unsubscribe();
  }

  public delete(): void {
    this.deleteObservationSub = this.observationService.delete(this.observation.uid).subscribe(
      value => {
        this.snackbarService.showSnackBar('Observación eliminada');
        this.deleteObservation.emit(this.observation.uid);
      },
      error => this.snackbarService.showSnackBar(error.error.message)
    );
  }

}
