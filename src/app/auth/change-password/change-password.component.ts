import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Person } from '../../models/person';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { showErrorAlert, showSuccesAlert } from '../../helpers/alerts';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  passwordsForm = new FormGroup({
    password1: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password2: new FormControl('', [Validators.required, Validators.minLength(6)])
  }, this.checkPasswords );

  public person: Person;

  public emailSend = false;
  public showError = false;
  public personLoaded = false;
  public sending = false;
  public loading = true;

  public isClient = false;

  get password1(): AbstractControl { return this.passwordsForm.get('password1'); }
  get password2(): AbstractControl { return this.passwordsForm.get('password2'); }

  public params = this.activedRoute.params[`_value`];

  public subscriptions: Subscription[] = [];

  constructor(public router: Router,
              public authService: AuthService,
              public activedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.findPersonByToken();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb?.unsubscribe());
  }

  public findPersonByToken(): void {
    const findPersonSub = this.authService.findPersonByToken(this.params.token).subscribe(
      (value) => {
        this.person = value.person;
        this.isClient = value.is_client;
        this.personLoaded = true;
        this.loading = false;
      },
      () => this.loading = false
    );
    this.subscriptions.push(findPersonSub);
  }

  public changePassword(): void {
    this.sending = true;
    const changePwdSub = this.authService.changePassword(this.person.uid, this.isClient, this.password1.value.trim()).subscribe(
      () => {
        this.sending = false;
        showSuccesAlert('Contraseña actualizada', () => this.router.navigateByUrl('/'));
      },
      () => {
        this.sending = false;
        showErrorAlert('No se puedo actualizar la contraseña', 'Verifica e intenta nuevamente', () => {});
      }
    );
    this.subscriptions.push(changePwdSub);
  }

  public checkPasswords(group: FormGroup): any {
    const p1 = group.get('password1').value;
    const p2 = group.get('password2').value;
    return p2.length < 6 || p1 === p2 ? null : { notSame: true };
  }

}
