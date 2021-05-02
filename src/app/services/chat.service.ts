import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  socket: Socket;
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
    this.url = environment.apiUrl + '/api/chat/';
    this.socket = io(environment.apiUrl, {transports: ['websocket']});
  }

  public listen(event: string): Observable<any>{
    return new Observable((subscriber) => {
      this.socket.on(event, data => subscriber.next(data));
    });
  }

  public emit(event: string, message: any): void {
    this.socket.emit(event, message);
  }

  public findLatestByProcess(process: string): Observable<any> {
    return this.httpClient.get(this.url + 'findLatestByProcess/' + process, this.headers);
  }

  public enableProcessChat(process: string): Observable<any> {
    return this.httpClient.get(this.url + 'enableProcessChat/' + process, this.headers);
  }

  public deleteMessagesByProcess(process: string): Observable<any> {
    return this.httpClient.delete(this.url + 'deleteMessagesByProcess/' + process, this.headers);
  }

}
