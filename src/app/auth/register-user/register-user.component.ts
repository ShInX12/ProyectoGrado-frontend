import { Component, OnInit } from '@angular/core';
import { AbstractControl} from '@angular/forms';
import { RegisterStepperService } from '../../services/register-stepper.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  registerForm = this.RSService.registerUserForm;

  constructor(private RSService: RegisterStepperService) { }

  ngOnInit(): void { }

  get email(): AbstractControl {
    return this.registerForm.get('email');
  }

  get password1(): AbstractControl {
    return this.registerForm.get('password1');
  }

  get password2(): AbstractControl {
    return this.registerForm.get('password2');
  }

}
