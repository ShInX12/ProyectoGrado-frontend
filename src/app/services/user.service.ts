import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { UserProcessDTO } from '../DTO/userProcessDTO';

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

  public findAll(): Observable<any> {
    return this.httpClient.get(this.url + 'findAll', this.headers);
  }

  public findAllByCompany(company: string): Observable<any> {
    return this.httpClient.get(this.url + 'findAllByCompany/' + company, this.headers);
  }

  public findAllPaginated(page: number = 0): Observable<any> {
    return this.httpClient.get(this.url + 'findAllPaginated/?page=' + page, this.headers);
  }

  public findAllPaginatedDTO(page: number = 0): Observable<any> {
    return this.httpClient.get(this.url + 'findAllPaginatedDTO/?page=' + page, this.headers);
  }

  public findAllPaginatedDTOByCompany(company: string, page: number = 0): Observable<any> {
    return this.httpClient.get(this.url + 'findAllPaginatedDTOByCompany/' + company + '?page=' + page, this.headers);
  }

  public findById(id: string): Observable<any> {
    return this.httpClient.get(this.url + 'findById/' + id, this.headers);
  }

  public findByProcess(id: string): Observable<UserProcessDTO[]> {
    return this.httpClient.get<UserProcessDTO[]>(this.url + 'findByProcess/' + id, this.headers);
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
    return this.httpClient.delete(this.url + 'delete/' + user.uid, this.headers);
  }

}
