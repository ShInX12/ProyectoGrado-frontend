import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientProcessService {

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
    this.url = environment.apiUrl + '/api/clientProcess/';
  }

  public save(client: string, process: string): Observable<any> {
    const body = { client, process };
    return this.httpClient.post(this.url + 'save', body, this.headers);
  }

  public delete(client: string, process: string): Observable<any> {
    return this.httpClient.delete(this.url + 'delete/' + client + '/' + process);
  }
}
