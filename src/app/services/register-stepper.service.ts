import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RegisterStepperService {

  constructor() { }

  registerUserForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password1: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password2: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  registerUserDetailsForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl(''),
    bio: new FormControl(''),
  });

  registerCompanyForm = new FormGroup({
    nit: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    phone: new FormControl(''),
    address: new FormControl('')
  });

}
