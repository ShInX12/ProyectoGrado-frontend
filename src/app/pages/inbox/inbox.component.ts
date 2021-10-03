import { Component, OnDestroy, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, Subscription } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

import { Document } from '../../models/document';
import { ProcessService } from '../../services/process.service';
import { SendDocumentsDTO } from '../../DTO/sendDocumentsDTO';
import { showErrorAlert, showSuccesAlert } from '../../helpers/alerts';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnDestroy {

  public sendDocumentsDTO: SendDocumentsDTO = new SendDocumentsDTO([], '', '');
  public documents: Document[] = [];

  public currentFile: File;

  public files: File[] = [];
  public percentUpload = 0;

  public complete: boolean[] = [];
  public uploadingDocuments = false;
  public existCode = true;

  public findByCodeSub: Subscription;
  public sendDocumentsSub: Subscription;

  modalRef: BsModalRef;

  constructor(public processService: ProcessService,
              private fireStorage: AngularFireStorage,
              private modalService: BsModalService) { }

  ngOnDestroy(): void {
    this.findByCodeSub?.unsubscribe();
    this.sendDocumentsSub?.unsubscribe();
  }

  public selectFile(file: File): void {
    this.currentFile = file;
  }

  public addFile(): void {
    this.files.push(this.currentFile);
    this.documents.push(
      new Document('', this.currentFile.name, '', '', new Date(), false, false, {uid: '', name: ''}, '')
    );
    this.closeFileModal();
  }

  public uploadFiles(): void {
    this.findByCodeSub = this.processService.findByCode(this.sendDocumentsDTO.code).subscribe(
      process => {
        this.existCode = true;
        if (this.files.length > 0) {
          this.uploadingDocuments = true;
          this.files.map(file => this.uploadFile(file).subscribe());
        }
      },
      error => this.existCode = false
    );
  }

  public uploadFile(file: File): Observable<any> {

    const id = Math.random().toString(32).substring(2, 7);
    const filePath = `test/${id}_${file.name}`;
    const ref = this.fireStorage.ref(filePath);
    const task = this.fireStorage.upload(filePath, file);

    return task.snapshotChanges().pipe(
      finalize(() => ref.getDownloadURL().subscribe(
        downloadUrl => {
          this.sendDocumentsDTO.documents.push(
            new Document('', file.name, '', downloadUrl, new Date(), false, false, {uid: '', name: ''}, '')
          );
          this.complete.push(true);
          this.sendDocuments();
        },
        error => this.complete.push(false)
        )
      )
    );
  }

  public sendDocuments(): void {
    if (this.files.length === this.complete.length) {
      this.sendDocumentsSub = this.processService.sendDocuments(this.sendDocumentsDTO).subscribe(
        value => {
          this.uploadingDocuments = false;
          this.clearDocuments();
          showSuccesAlert('Documentos enviados correctamente', () => {});
        },
        error => {
          this.uploadingDocuments = false;
          this.clearDocuments();
          showErrorAlert('No se lograron enviar los documentos', error.error.message, () => {});
        }
      );
    }
  }

  public openModal(modal: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(modal, {class: 'modal-lg'});
  }

  public closeFileModal(): void {
    this.currentFile = null;
    this.modalRef.hide();
  }

  private clearDocuments(): void {
    this.currentFile = null;
    this.files = [];
    this.documents = [];
    this.sendDocumentsDTO.documents = [];
    this.complete = [];
  }
}
