import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { showErrorAlert, showSuccesAlert } from '../../helpers/alerts';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  public user: User;
  public currentPassword = '';
  public newPassword1 = '';
  public newPassword2 = '';

  public nameValid = true;

  public updateUserSub: Subscription;
  public updatePasswordSub: Subscription;

  modalRef: BsModalRef;

  constructor(public authService: AuthService,
              public userService: UserService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    this.loadClient();
  }

  ngOnDestroy(): void {
    this.updateUserSub?.unsubscribe();
    this.updatePasswordSub?.unsubscribe();
  }

  public loadClient(): void {
    this.user = this.authService.user;
    console.log(this.authService.company.name);
  }

  public updateClient(): void {
    this.trimFields();
    this.userService.update(this.user).subscribe(
      value => showSuccesAlert('Usuario actualizado', () => {}),
      error => showErrorAlert('Error al actualizar el usuario', error.error.message, () => {}),
    );
  }

  public updatePasword(): void {
    this.trimPasswords();
    this.userService.updatePassword(this.user.uid, this.currentPassword, this.newPassword1).subscribe(
      value => showSuccesAlert('Contraseña actualizada', () => this.modalRef.hide()),
      error => showErrorAlert('Error al actualizar la contraseña', error.error.message, () => {}),
    );
  }

  public trimFields(): void {
    this.user.name = this.user.name?.trim();
    this.user.email = this.user.email?.trim();
    this.user.phone = this.user.phone?.trim();
    this.user.bio = this.user.bio?.trim();
  }

  public trimPasswords(): void {
    this.currentPassword = this.currentPassword?.trim();
    this.newPassword1 = this.newPassword1?.trim();
    this.newPassword2 = this.newPassword2?.trim();
  }

  public validatePasswords(): boolean {
    return this.currentPassword.length > 5
      && this.newPassword1.length > 5
      && this.newPassword1 === this.newPassword2;
  }

  public openModal(modal: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(modal);
  }
}
