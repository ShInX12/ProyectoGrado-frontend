import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterStepperService {

  constructor() { }

  registerUserForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password1: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password2: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  registerUserDetailsForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl(''),
    personal_id: new FormControl(''),
    personal_id_type: new FormControl(environment.DEAFULT_PERSONAL_ID_TYPE),
  });

  registerCompanyForm = new FormGroup({
    nit: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    phone: new FormControl(''),
    address: new FormControl('')
  });

}
