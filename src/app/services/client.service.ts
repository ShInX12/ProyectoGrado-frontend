import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

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
    this.url = environment.apiUrl + '/api/client/';
  }

  public findAll(): Observable<any> {
    return this.httpClient.get(this.url + 'findAll', this.headers);
  }

  public findAllPaginated(page: number = 0): Observable<any> {
    return this.httpClient.get(this.url + 'findAllPaginated/?page=' + page, this.headers);
  }

  public findAllPaginatedByCompany(company: string, page: number = 0): Observable<any> {
    return this.httpClient.get(this.url + 'findAllPaginatedByCompany/' + company + '?page=' + page, this.headers);
  }

  public findAllPaginatedDTO(page: number = 0): Observable<any> {
    return this.httpClient.get(this.url + 'findAllPaginatedDTO/?page=' + page, this.headers);
  }

  public findAllPaginatedDTOByCompany(company: string, page: number = 0): Observable<any> {
    return this.httpClient.get(this.url + 'findAllPaginatedDTOByCompany/' + company + '?page=' + page, this.headers);
  }

  public findLastest(limit: number = 10): Observable<any> {
    return this.httpClient.get(this.url + 'findLastest/?limit=' + limit, this.headers);
  }

  public findLastestByCompany(company: string, limit: number = 10): Observable<any> {
    return this.httpClient.get(this.url + 'findLastestByCompany/' + company + '?limit=' + limit, this.headers);
  }

  public findById(id: string): Observable<any> {
    return this.httpClient.get(this.url + 'findById/' + id, this.headers);
  }

  public save(client: Client): Observable<any> {
    return this.httpClient.post(this.url + 'save', client);
  }

  public update(client: Client): Observable<any> {
    return this.httpClient.put(this.url + 'update/' + client.uid, client, this.headers);
  }

  public updatePassword(clientId: string, oldPassword: string, newPassword: string): Observable<any> {
    const body = {old_password: oldPassword, new_password: newPassword};
    return this.httpClient.put(this.url + 'updatePassword/' + clientId, body, this.headers);
  }

  public delete(id: string): Observable<any> {
    return this.httpClient.delete(this.url + 'delete/' + id, this.headers);
  }

  public findByProcess(processId: string): Observable<any> {
    return this.httpClient.get(this.url + 'findByProcess/' + processId, this.headers);
  }

  public findNameDTOByProcess(processId: string): Observable<any> {
    return this.httpClient.get(this.url + 'findNameDTOByProcess/' + processId, this.headers);
  }

}
