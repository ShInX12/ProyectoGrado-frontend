import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observation } from '../../models/observation';
import { environment } from '../../../environments/environment';
import { ObservationService } from '../../services/observation.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-observations-box',
  templateUrl: './observations-box.component.html',
  styleUrls: ['./observations-box.component.css']
})
export class ObservationsBoxComponent implements OnInit, OnDestroy {

  @Input() processId: string;
  @Input() rounded = false;
  public observations: Observation[] = [];
  public newObservation: Observation = new Observation('0', null, '', '', true, environment.DEFAULT_OBSERVATION_TYPE);

  public subscriptions: Subscription[] = [];

  constructor(public observationService: ObservationService,
              public snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.findObservationsByProcess();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb?.unsubscribe());
  }

  public findObservationsByProcess(): void {
    const observationsSub = this.observationService.findByProcess(this.processId).subscribe(
      observations => this.observations = observations,
      error => console.warn(error.error.message)
    );
    this.subscriptions.push(observationsSub);
  }

  public addObservation(): void {
    this.newObservation.process = this.processId;
    this.newObservation.date = new Date();
    const saveObservationSub = this.observationService.save(this.newObservation).subscribe(
      observation => {
        this.observations.push(observation);
        this.newObservation.body = '';
      },
      error => this.snackbarService.showSnackBar(error.error.message)
    );
    this.subscriptions.push(saveObservationSub);
  }

  public deleteObservation(uid: string): void {
    this.observations = this.observations.filter(obs => obs.uid !== uid);
  }

}
