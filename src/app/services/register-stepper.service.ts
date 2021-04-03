import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RegisterStepperService {

  constructor() { }

  registerUserForm = new FormGroup({
    email: new FormControl('test@user.com', [Validators.required, Validators.email]),
    password1: new FormControl('123456', [Validators.required, Validators.minLength(6)]),
    password2: new FormControl('123456', [Validators.required, Validators.minLength(6)])
  });

  registerUserDetailsForm = new FormGroup({
    name: new FormControl('Sergio Naranjo', [Validators.required]),
    phone: new FormControl('3108278538'),
    personal_id: new FormControl(''),
    personal_id_type: new FormControl(''),
  });

  registerCompanyForm = new FormGroup({
    nit: new FormControl('122112212'),
    name: new FormControl('Abogados SN', [Validators.required]),
    phone: new FormControl('4433112'),
    address: new FormControl('Calle 31')
  });

}
