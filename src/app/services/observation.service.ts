import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Observation } from '../models/observation';

@Injectable({
  providedIn: 'root'
})
export class ObservationService {

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
    this.url = environment.apiUrl + '/api/observation/';
  }

  public findByProcess(id: string): Observable<any> {
    return this.httpClient.get(this.url + 'findByProcess/' + id, this.headers);
  }

  public save(observation: Observation): Observable<any> {
    return this.httpClient.post(this.url + 'save', observation, this.headers);
  }

  public delete(id: string): Observable<any> {
    return this.httpClient.delete(this.url + 'delete/' + id, this.headers);
  }
}
