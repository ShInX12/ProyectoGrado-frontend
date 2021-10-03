import { Component } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { RegisterStepperService } from '../../services/register-stepper.service';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.scss']
})
export class RegisterCompanyComponent {

  registerForm = this.RSService.registerCompanyForm;

  constructor(public RSService: RegisterStepperService) { }

  get name(): AbstractControl {
    return this.registerForm.get('name');
  }

}
