import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CalendarEvent } from '../models/calendarEvent';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

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
    this.url = environment.apiUrl + '/api/calendar/';
  }

  public findByUser(): Observable<any> {
    return this.httpClient.get(this.url + 'findByUser', this.headers);
  }

  public save(event: CalendarEvent): Observable<any> {
    return this.httpClient.post(this.url + 'save', event, this.headers);
  }

  public update(event: CalendarEvent): Observable<any> {
    return this.httpClient.put(this.url + 'update/' + event.id, event, this.headers);
  }

  public delete(id: string): Observable<any> {
    return this.httpClient.delete(this.url + 'delete/' + id, this.headers);
  }
}
