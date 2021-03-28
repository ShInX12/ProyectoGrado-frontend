import { Component, OnInit } from '@angular/core';
import Stepper from 'bs-stepper';
import { RegisterStepperService } from '../../services/register-stepper.service';

@Component({
  selector: 'app-register-stepper',
  templateUrl: './register-stepper.component.html',
  styleUrls: ['./register-stepper.component.css']
})
export class RegisterStepperComponent implements OnInit {

  private stepper: Stepper;

  constructor(public RSService: RegisterStepperService) { }

  ngOnInit(): void {
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: true,
      animation: true
    });
  }

  next(): any {
    this.stepper.next();
  }

  previus(): any {
    this.stepper.previous();
  }

  register(): any {
    console.log(this.RSService.registerUserForm.value);
    console.log(this.RSService.registerUserDetailsForm.value);
    console.log(this.RSService.registerCompanyForm.value);
    return false;
  }



}
