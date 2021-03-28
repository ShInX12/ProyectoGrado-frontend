import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { RegisterStepperService } from '../../services/register-stepper.service';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit, OnDestroy {

  public user: User = new User('', '', '', true, '', '', '', '', '', true, null);

  registerForm = this.RSService.registerUserForm;

  public showError = false;
  public error = '';

  public signUpSub: Subscription;

  constructor(private router: Router,
              private userService: UserService,
              private authService: AuthService,
              private RSService: RegisterStepperService) {
  }

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

  ngOnDestroy(): void {
    this.signUpSub?.unsubscribe();
  }

  register(): void {

    this.user.email = this.registerForm.get('email').value;
    this.user.password = this.registerForm.get('password1').value;
    this.user.name = this.registerForm.get('name').value;
    this.user.phone = this.registerForm.get('phone').value;
    this.signUpSub = this.userService.save(this.user).subscribe(
      value => {
        localStorage.setItem('token', value.token);
        this.authService.user = value.user;
        this.router.navigateByUrl('');
      },
      error => {
        this.error = error.error.message;
        this.showError = true;
      }
    );

  }

}
