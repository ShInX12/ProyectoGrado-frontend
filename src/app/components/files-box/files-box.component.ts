import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AngularFireStorage } from '@angular/fire/storage';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { Document } from '../../models/document';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';
import { DocumentService } from '../../services/document.service';
import { showErrorAlert, showSuccesAlert } from '../../helpers/alerts';

@Component({
  selector: 'app-files-box',
  templateUrl: './files-box.component.html',
  styleUrls: ['./files-box.component.css']
})
export class FilesBoxComponent implements OnInit {

  @Input() processId: string;
  @Input() documentsFromLawyer: boolean;
  public documents: Document[] = [];
  public newDocument: Document =
    new Document('0', '', '', '', null, null, null, {uid: '', name: ''}, '', environment.DEFAULT_DOCUMENT_TYPE);

  public subscriptions: Subscription[] = [];

  public tempFile: any;
  public newFile: File;
  public percentUpload = 0;

  modalRef: BsModalRef;

  constructor(
    public documentService: DocumentService,
    public authService: AuthService,
    private modalService: BsModalService,
    private fireStorage: AngularFireStorage,
  ) { }

  ngOnInit(): void {
    this.findDocumentsByProcess();
  }

  public findDocumentsByProcess(): void {
    const documentsByProcessSub = this.documentService.findByProcess(this.processId).subscribe(
      documents => this.documents = documents.filter(doc => doc.from_lawyer === this.documentsFromLawyer),
      error => console.warn(error.error.message)
    );
    this.subscriptions.push(documentsByProcessSub);
  }

  public selectFile(file: File): void {
    this.newFile = file;
    this.newDocument.title = file.name;
  }

  public uploadFile(): void {

    const id = Math.random().toString(32).substring(2, 7);
    const filePath = `files/${this.processId}/${id}-${this.newFile.name}`;
    const ref = this.fireStorage.ref(filePath);
    const task = this.fireStorage.upload(filePath, this.newFile);
    task.percentageChanges().subscribe(value => this.percentUpload = value);

    task.snapshotChanges().pipe(
      finalize(() => ref.getDownloadURL().subscribe(downloadUrl => {
          this.newDocument.url = downloadUrl;
          this.newDocument.upload_date = new Date();
          this.newDocument.process = this.processId;
          this.newDocument.user = { uid: this.authService.person.uid, name: this.authService.person.name };
          this.newDocument.from_lawyer = this.documentsFromLawyer;

          const saveDocumentSub = this.documentService.save(this.newDocument).subscribe(
            document => {
              this.documents.push(document);
              showSuccesAlert('Documento guardado correctamente', () => {
                this.newFile = null;
                this.modalRef.hide();
              });
            },
            error => showErrorAlert(
                'No se pudo guardar el documento', error.error.message, () => {
                  this.newFile = null;
                  this.modalRef.hide();
                }
              )
          );
          this.subscriptions.push(saveDocumentSub);
        },
        error => console.warn(error.error.message)
        )
      )
    ).subscribe();
  }

  public deleteDocument(uid: string): void {
    this.documents = this.documents.filter(doc => doc.uid !== uid);
  }

  public openModal(modal: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(modal, {class: 'modal-lg'});
  }

  public closeFileModal(): void {
    this.modalRef.hide();
    this.newFile = null;
    this.newDocument.title = '';
  }

}
