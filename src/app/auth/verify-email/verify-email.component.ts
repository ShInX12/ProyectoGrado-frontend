import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit, OnDestroy {

  public loading = true;
  public email = '';
  public successful = false;

  public verifyEmailSub: Subscription;

  public params = this.activedRoute.params[`_value`];

  constructor(public activedRoute: ActivatedRoute,
              public authService: AuthService) { }

  ngOnInit(): void {
    this.verifyEmail();
  }

  ngOnDestroy(): void {
    this.verifyEmailSub?.unsubscribe();
  }

  public verifyEmail(): void {
    this.verifyEmailSub = this.authService.verifyEmail(this.params.token).subscribe(
      (value) => {
        this.email = value.email;
        this.loading = false;
        this.successful = true;
      },
      () => this.loading = false
    );

  }

}
