import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

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
    this.url = environment.apiUrl + '/api/company/';
  }

  public findAll(): Observable<any> {
    return this.httpClient.get(this.url + 'findAll/', this.headers);
  }

  public findById(id: string): Observable<any> {
    return this.httpClient.get(this.url + 'findById/' + id, this.headers);
  }

  public save(company: Company): Observable<any> {
    return this.httpClient.post(this.url + 'save', company, this.headers);
  }

  public update(company: Company): Observable<any> {
    return this.httpClient.put(this.url + 'update/' + company.uid, company, this.headers);
  }

  public delete(company: Company): Observable<any> {
    return this.httpClient.delete(this.url + 'delete/' + company.uid, this.headers);
  }

}
