import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { RegisterStepperService } from '../../services/register-stepper.service';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.css']
})
export class RegisterCompanyComponent implements OnInit {

  registerForm = this.RSService.registerCompanyForm;

  constructor(public RSService: RegisterStepperService) { }

  ngOnInit(): void { }

  get name(): AbstractControl {
    return this.registerForm.get('name');
  }

}
