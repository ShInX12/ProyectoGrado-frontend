import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { AuthService, Role } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { showErrorAlert, showSuccesAlert } from '../../helpers/alerts';
import { User } from '../../models/user';
import { Client } from '../../models/client';
import { Person } from '../../models/person';
import { ClientService } from '../../services/client.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  public person: Person;
  public currentPassword = '';
  public newPassword1 = '';
  public newPassword2 = '';

  public nameValid = true;

  public imgTemp = null;
  public newImage: File;
  public uploading = false;

  public updateUserSub: Subscription;
  public updatePasswordSub: Subscription;

  modalRef: BsModalRef;

  constructor(public authService: AuthService,
              public userService: UserService,
              public clientService: ClientService,
              private modalService: BsModalService,
              private fireStorage: AngularFireStorage) { }

  ngOnInit(): void {
    this.loadPerson();
  }

  ngOnDestroy(): void {
    this.updateUserSub?.unsubscribe();
    this.updatePasswordSub?.unsubscribe();
  }

  public loadPerson(): void {
    this.person = this.authService.person;
  }

  public updatePerson(): void {
    this.trimFields();
    if (this.authService.role === Role.Client) {
      this.clientService.update(this.person as Client).subscribe(
        value => showSuccesAlert('Cliente actualizado', () => {}),
        error => showErrorAlert('Error al actualizar el cliente', error.error.message, () => {}),
      );
    } else {
      this.userService.update(this.person as User).subscribe(
        value => showSuccesAlert('Usuario actualizado', () => {}),
        error => showErrorAlert('Error al actualizar el usuario', error.error.message, () => {}),
      );
    }
  }

  public updatePasword(): void {
    this.trimPasswords();
    if (this.authService.role === Role.Client) {
      this.clientService.updatePassword(this.person.uid, this.currentPassword, this.newPassword1).subscribe(
        value => showSuccesAlert('Contraseña actualizada', () => this.modalRef.hide()),
        error => showErrorAlert('Error al actualizar la contraseña', error.error.message, () => {}),
      );
    } else {
      this.userService.updatePassword(this.person.uid, this.currentPassword, this.newPassword1).subscribe(
        value => showSuccesAlert('Contraseña actualizada', () => this.modalRef.hide()),
        error => showErrorAlert('Error al actualizar la contraseña', error.error.message, () => {}),
      );
    }
  }

  public trimFields(): void {
    this.person.name = this.person.name?.trim();
    this.person.email = this.person.email?.trim();
    this.person.phone = this.person.phone?.trim();
    this.person.bio = this.person.bio?.trim();
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

  public changeImage(file: File): void {
    this.newImage = file;
    if (!file) {
      return this.imgTemp = null;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
      this.uploadPicture();
    };
  }

  public uploadPicture(): void {
    this.uploading = true;
    const filePath = `pictures/${ this.authService.person.uid }`;
    const ref = this.fireStorage.ref(filePath);
    const task = this.fireStorage.upload(filePath, this.newImage);

    task.snapshotChanges().pipe(
      finalize(() => ref.getDownloadURL().subscribe(
        (url) => {
          this.person.photo_url = url;
          this.updatePerson();
          this.uploading = false;
        },
        error => {
          console.warn(error.error.message);
          this.uploading = false;
        }
        )
      )
    ).subscribe();
  }

  public deletePicture(): void {
    if (this.person.photo_url.length > 0) {
      this.fireStorage.refFromURL(this.person.photo_url).delete();
      this.person.photo_url = '';
    }
    this.imgTemp = null;
    this.updatePerson();
  }
}
