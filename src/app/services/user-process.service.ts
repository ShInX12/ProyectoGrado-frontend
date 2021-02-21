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
}
