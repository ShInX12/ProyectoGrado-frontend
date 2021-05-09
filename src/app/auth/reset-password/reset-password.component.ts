import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  resetPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  public emailSend = false;
  public showError = false;
  public loading = false;

  public resetPasswordSub: Subscription;

  constructor(public authService: AuthService) { }

  public resetPassword(): void {
    this.loading = true;
    this.resetPasswordSub = this.authService.resetPassword(this.resetPasswordForm.get('email').value).subscribe(
      () => {
        this.emailSend = true;
        this.showError = false;
        this.loading = false;
      },
      () => {
        this.showError = true;
        this.emailSend = false;
        this.loading = false;
      }
    );
  }

}
