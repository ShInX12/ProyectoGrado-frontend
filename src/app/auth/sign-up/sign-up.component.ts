import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {

  public user: User = new User('', '', '', true, '', '', '', '', 1);

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password1: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password2: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  public showError = false;
  public error = '';

  public signUpSub: Subscription;

  constructor(private router: Router,
              private userService: UserService,
              private authService: AuthService) {
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.signUpSub?.unsubscribe();
  }

  validPasswords(): boolean {
    if (this.registerForm.get('password1').value !==
      this.registerForm.get('password2').value) {
      this.error = 'Las contraseñas no coinciden';
      this.showError = true;
      return false;
    } else {
      return true;
    }
  }

  register(): void {

    if (this.validPasswords()) {

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

}
