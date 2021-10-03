import { Component, OnDestroy, OnInit } from '@angular/core';
import { Company } from '../../models/company';
import { AuthService } from '../../services/auth.service';
import { CompanyService } from '../../services/company.service';
import { showErrorAlert, showSuccesAlert } from '../../helpers/alerts';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit, OnDestroy {

  public company: Company = new Company('', '', '', '', '', '', 0);

  public logoTemp = null;
  public newLogo: File;
  public uploading = false;

  public subscriptions: Subscription[] = [];

  constructor(public authService: AuthService,
              public companyService: CompanyService,
              private fireStorage: AngularFireStorage) { }

  ngOnInit(): void {
    this.company = this.authService.company;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb?.unsubscribe());
  }

  public updateCompany(): void {
    const updateSub = this.companyService.update(this.company).subscribe(
      value => showSuccesAlert('Compañia actualizada', () => {}),
      error => showErrorAlert('Error al actualizar la compañia', error.error.message, () => {}),
    );
    this.subscriptions.push(updateSub);
  }

  public changeImage(file: File): void {
    this.newLogo = file;
    if (!file) {
      return this.logoTemp = null;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.logoTemp = reader.result;
      this.uploadPicture();
    };
  }

  public uploadPicture(): void {
    this.uploading = true;
    const filePath = `logos/${ this.authService.company.uid }`;
    const ref = this.fireStorage.ref(filePath);
    const task = this.fireStorage.upload(filePath, this.newLogo);

    task.snapshotChanges().pipe(
      finalize(() => ref.getDownloadURL().subscribe(
        (url) => {
          this.company.logo = url;
          this.updateCompany();
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

  public deleteLogo(): void {
    if (this.company.logo.length > 0) {
      this.fireStorage.refFromURL(this.company.logo).delete();
      this.company.logo = '';
    }
    this.logoTemp = null;
    this.updateCompany();
  }
}
