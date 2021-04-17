import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService, Role } from '../../services/auth.service';
import { User } from '../../models/user';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm = new FormGroup({
    email: new FormControl('test1@user.com', [Validators.required, Validators.email]),
    password: new FormControl('123456', [Validators.required, Validators.minLength(6)]),
  });

  public hidePassword = false;
  public showError = false;
  public error = '';

  public loginSub: Subscription;

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.loginSub?.unsubscribe();
  }

  login(): void {
    this.loginSub = this.authService
      .login(this.loginForm.get('email').value, this.loginForm.get('password').value)
      .subscribe(
        value => {
          localStorage.setItem('token', value.token);
          this.redirect(value.is_client, value.person as User);
        },
        error => {
          this.error = error.error.message;
          this.showError = true;
        }
      );
  }

  redirect(isClient: boolean, person: User): void {

    if (isClient){
      this.router.navigateByUrl(Role.Client);

    } else {
      switch (person.user_type_id) {

        case environment.USER_TYPE_ADMINISTRADOR:
          this.router.navigateByUrl(Role.Administrator);
          break;

        case environment.USER_TYPE_ABOGADO:
          this.router.navigateByUrl(Role.Lawyer);
          break;

        case environment.USER_TYPE_ASISTENTE:
          this.router.navigateByUrl(Role.Assistant);
          break;
      }
    }
  }

}
