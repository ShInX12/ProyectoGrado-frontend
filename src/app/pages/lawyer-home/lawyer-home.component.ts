import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-lawyer-home',
  templateUrl: './lawyer-home.component.html',
  styles: []
})
export class LawyerHomeComponent implements OnInit {

  public caseCode = environment.CASE_CODE;
  public movementCode = environment.MOVEMENT_CODE;

  constructor() { }

  ngOnInit(): void { }

}
