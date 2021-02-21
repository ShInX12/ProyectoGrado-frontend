import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Document } from '../models/document';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

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
    this.url = environment.apiUrl + '/api/document/';
  }

  public findByProcess(process: string): Observable<any> {
    return this.httpClient.get(this.url + 'findByProcess/' + process, this.headers);
  }

  public findLastestByProcess(process: string): Observable<any> {
    return this.httpClient.get(this.url + 'findLastestByProcess/' + process, this.headers);
  }

  public save(document: Document): Observable<any> {
    return this.httpClient.post(this.url + 'save', document, this.headers);
  }

  public update(document: Document): Observable<any> {
    return this.httpClient.put(this.url + 'update/' + document.uid, document, this.headers);
  }

  public delete(document: Document): Observable<any> {
    return this.httpClient.delete(this.url + 'delete/' + document.uid, this.headers);
  }
}
