import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  // tslint:disable-next-line:variable-name
  private _clientModalHiden = true;
  // tslint:disable-next-line:variable-name
  private _processModalHiden = true;
  // tslint:disable-next-line:variable-name
  private _userModalHiden = true;

  public processType: string;
  public processTypeName: string;

  constructor() { }

  get clientModalHiden(): boolean {
    return this._clientModalHiden;
  }

  get processModalHiden(): boolean {
    return this._processModalHiden;
  }

  get userModalHiden(): boolean {
    return this._userModalHiden;
  }

  public openClient(): void {
    this._clientModalHiden = false;
  }

  public openProcess(processType: string): void {
    this.processType = processType;
    if (processType === environment.CASE_CODE) {
      this.processTypeName = 'caso';
    } else if (processType === environment.MOVEMENT_CODE) {
      this.processTypeName = 'movimiento';
    }
    this._processModalHiden = false;
  }

  public openUser(): void {
    this._userModalHiden = false;
  }

  public close(): void {
    this._clientModalHiden = true;
    this._processModalHiden = true;
    this._userModalHiden = true;
  }

}
