import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Stepper from 'bs-stepper';
import { Subscription } from 'rxjs';
import { User } from '../../models/user';
import { Company } from '../../models/company';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
import { RegisterStepperService } from '../../services/register-stepper.service';

@Component({
  selector: 'app-register-stepper',
  templateUrl: './register-stepper.component.html',
  styleUrls: ['./register-stepper.component.css']
})
export class RegisterStepperComponent implements OnInit, OnDestroy {

  private stepper: Stepper;

  public user: User
    = new User('', '', '', '', '', '', '', '', true, environment.DEFAULT_DOCUMENT_TYPE, '', '', true);
  public company: Company = new Company('', '', '', '', '', '', 0);

  private registerSub: Subscription;

  public showError = false;
  public error = '';

  constructor(public RSService: RegisterStepperService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: true,
      animation: true
    });
  }

  ngOnDestroy(): void {
    this.registerSub?.unsubscribe();
  }

  next(): any {
    this.stepper.next();
  }

  previus(): any {
    this.stepper.previous();
  } // TODO: Hacer un boton para devolverse al login

  register(): any {
    this.user.email = this.RSService.registerUserForm.get('email').value;
    this.user.password = this.RSService.registerUserForm.get('password1').value;
    this.user.name = this.RSService.registerUserDetailsForm.get('name').value;
    this.user.phone = this.RSService.registerUserDetailsForm.get('phone').value;
    this.user.personal_id_type = this.RSService.registerUserDetailsForm.get('personal_id_type').value;
    this.user.personal_id = this.RSService.registerUserDetailsForm.get('personal_id').value;
    this.user.user_type_id = environment.USER_TYPE_ADMINISTRADOR;

    this.company.nit = this.RSService.registerCompanyForm.get('nit').value;
    this.company.name = this.RSService.registerCompanyForm.get('name').value;
    this.company.phone = this.RSService.registerCompanyForm.get('phone').value;
    this.company.address = this.RSService.registerCompanyForm.get('address').value;

    this.registerSub = this.authService.registerUserWithCompany(this.user, this.company).subscribe(
      value => {
        localStorage.setItem('token', value.token);
        this.authService.person = value.user;
        this.authService.company = value.company;
        this.router.navigateByUrl('');
      },
      error => {
        this.error = error.error.message;
        this.showError = true;
      }
    );
    return false;
  }

}
