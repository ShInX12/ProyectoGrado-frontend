import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { RegisterStepperService } from '../../services/register-stepper.service';

@Component({
  selector: 'app-register-user-details',
  templateUrl: './register-user-details.component.html',
  styleUrls: ['./register-user-details.component.css']
})
export class RegisterUserDetailsComponent implements OnInit {

  registerForm = this.RSService.registerUserDetailsForm;

  constructor(public RSService: RegisterStepperService) { }

  ngOnInit(): void { }

  get name(): AbstractControl {
    return this.registerForm.get('name');
  }

}
