import { Component, OnInit, Input, TemplateRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DocumentService } from '../../services/document.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Document } from '../../models/document';
import { showErrorAlert, showSuccesAlert, showWarningDeleteAlert } from '../../helpers/alerts';

@Component({
  selector: 'app-file-card',
  templateUrl: './file-card.component.html',
  styleUrls: ['./file-card.component.css']
})
export class FileCardComponent implements OnInit, OnDestroy {

  @Input() document: Document;
  @Input() showAll = true;
  @Output() public deletedFile: EventEmitter<string> = new EventEmitter();
  public safeUrl;
  modalRef: BsModalRef;

  public updateDocsub: Subscription;
  public deleteDocsub: Subscription;

  constructor(private modalService: BsModalService,
              private fireStorage: AngularFireStorage,
              public documentService: DocumentService,
              public snackbarService: SnackbarService,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getSafeUrl();
  }

  ngOnDestroy(): void {
    this.deleteDocsub?.unsubscribe();
    this.updateDocsub?.unsubscribe();
  }

  getSafeUrl(): void {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.document.url);
  }

  public update(): void {
    this.documentService.update(this.document).subscribe(
      document => this.snackbarService.showSnackBar('Documento actualizado'),
      error => this.snackbarService.showSnackBar(error.error.message)
    );
  }

  public delete(): void {
    showWarningDeleteAlert('¿Desea eliminar el documento?', 'Esta acción no se puede deshacer', (result) => {
      if (result.isConfirmed) {
        this.documentService.delete(this.document).subscribe(
          value => {
            this.deletedFile.emit(this.document.uid);
            this.fireStorage.refFromURL(this.document.url).delete();
            showSuccesAlert('Documento eliminado', () => this.modalRef.hide());
          },
          error => showErrorAlert('No se pudo eliminar el documento', error.error.message, () => {})
        );
      }
    });
  }

  public open(modal: TemplateRef<any>): void {
    if (this.showAll) {
      this.modalRef = this.modalService.show(modal, {class: 'modal-xl'});
    }
  }

}
