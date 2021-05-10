import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { UserProcess } from '../models/userProcess';

@Injectable({
  providedIn: 'root'
})
export class UserProcessService {

  public url: string;

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers(): object {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  constructor(public httpClient: HttpClient) {
    this.url = environment.apiUrl + '/api/userProcess/';
  }

  public save(userProcess: UserProcess): Observable<any> {
    return this.httpClient.post(this.url + 'save', userProcess, this.headers);
  }

  public update(userProcess: UserProcess): Observable<any> {
    return this.httpClient.put(this.url + 'update/' + userProcess.uid, userProcess, this.headers);
  }

  public delete(uid: string): Observable<any> {
    return this.httpClient.delete(this.url + 'delete/' + uid);
  }
}
