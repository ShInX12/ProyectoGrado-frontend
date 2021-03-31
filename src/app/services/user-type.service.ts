import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { UserType } from '../models/userType';

@Injectable({
  providedIn: 'root'
})
export class UserTypeService {

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
    this.url = environment.apiUrl + '/api/userType/';
  }

  public findAll(): Observable<any> {
    return this.httpClient.get(this.url + 'findAll/', this.headers);
  }

  public findById(id: string): Observable<any> {
    return this.httpClient.get(this.url + 'findById/' + id, this.headers);
  }

  public save(userType: UserType): Observable<any> {
    return this.httpClient.post(this.url + 'save', userType, this.headers);
  }

  public update(userType: UserType): Observable<any> {
    return this.httpClient.put(this.url + 'update/' + userType.uid, userType, this.headers);
  }

  public delete(userType: UserType): Observable<any> {
    return this.httpClient.delete(this.url + 'delete/' + userType.uid, this.headers);
  }

}
