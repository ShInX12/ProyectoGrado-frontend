import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url: string;

  constructor(private httpClient: HttpClient) {
    this.url = environment.apiUrl + '/api/user/';
  }

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

  public save(user: User): Observable<any> {
    return this.httpClient.post(this.url + 'save', user);
  }

  public update(user: User): Observable<any> {
    return this.httpClient.put(this.url + 'update/' + user.uid, user, this.headers);
  }

  public updatePassword(userId: string, oldPassword: string, newPassword: string): Observable<any> {
    const body = {old_password: oldPassword, new_password: newPassword};
    return this.httpClient.put(this.url + 'updatePassword/' + userId, body, this.headers);
  }

  public delete(user: User): Observable<any> {
    return this.httpClient.put(this.url + 'delete/' + user.uid, user, this.headers);
  }

}
