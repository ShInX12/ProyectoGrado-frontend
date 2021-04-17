import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { PersonalIdType } from '../../models/personalIdType';
import { RegisterStepperService } from '../../services/register-stepper.service';
import { PersonalIdTypeService } from '../../services/personal-id-type.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register-user-details',
  templateUrl: './register-user-details.component.html',
  styleUrls: ['./register-user-details.component.css']
})
export class RegisterUserDetailsComponent implements OnInit {

  registerForm = this.RSService.registerUserDetailsForm;

  public personalIdTypes: PersonalIdType[] = [];

  public personalIdSub: Subscription;

  constructor(public RSService: RegisterStepperService,
              public personalIdTypeService: PersonalIdTypeService) { }

  ngOnInit(): void {
    this.findPersonalIdTypes();
  }

  get name(): AbstractControl {
    return this.registerForm.get('name');
  }

  public findPersonalIdTypes(): void {
    this.personalIdSub = this.personalIdTypeService.findAll().subscribe(
      ({personal_id_types}) => this.personalIdTypes = personal_id_types,
      error => console.warn(error.error.message)
    );
  }

}
