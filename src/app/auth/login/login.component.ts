import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  public hidePassword = false;
  public showError = false;
  public error = '';

  public loginSub: Subscription;

  constructor(private router: Router,
              private authService: AuthService) {
  }

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
          this.router.navigateByUrl('');
        },
        error => {
          this.error = error.error.message;
          this.showError = true;
        }
      );
  }
}
