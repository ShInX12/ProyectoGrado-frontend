import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

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
    this.url = environment.apiUrl + '/api/search/';
  }

  public all(term: string): Observable<any> {
    return this.httpClient.get(this.url + term, this.headers);
  }

  public allByCompany(company: string, term: string): Observable<any> {
    return this.httpClient.get(this.url + 'allByCompany/' + company + '/' + term, this.headers);
  }

  public collection(collection: string, term: string): Observable<any> {
    return this.httpClient.get(this.url + 'collection/' + collection + '/' + term, this.headers);
  }

  public collectionByCompany(company: string, collection: string, term: string): Observable<any> {
    return this.httpClient.get(this.url + 'collectionByCompany/' + company + '/' + collection + '/' + term, this.headers);
  }

}
