import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Process } from '../models/process';
import { SendDocumentsDTO } from '../DTO/sendDocumentsDTO';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

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
    this.url = environment.apiUrl + '/api/process/';
  }

  public findAllPaginated(processType: string = '0', page: number = 0): Observable<any> {
    return this.httpClient.get(this.url + 'findAllPaginated/?page=' + page + '&type=' + processType, this.headers);
  }

  public findByUser(id: string, processType: string = '0', page: number = 0): Observable<any> {
    return this.httpClient.get(this.url + 'findByUser/' + id + '?page=' + page + '&type=' + processType, this.headers);
  }

  public findByUserToken(processType: string = '0', page: number = 0): Observable<any> {
    return this.httpClient.get(this.url + 'findByUser/0' + '?page=' + page + '&type=' + processType, this.headers);
  }

  public findByClient(client: string): Observable<any> {
    return this.httpClient.get(this.url + 'findByClient/' + client, this.headers);
  }

  public findByClientUser(client: string, user: string): Observable<any> {
    return this.httpClient.get(this.url + 'findByClientUser/' + client + '/' + user, this.headers);
  }

  public findById(id: string): Observable<any> {
    return this.httpClient.get(this.url + 'findById/' + id, this.headers);
  }

  public findByIdDTO(id: string): Observable<any> {
    return this.httpClient.get(this.url + 'findByIdDTO/' + id, this.headers);
  }

  public findByCode(code: string): Observable<any> {
    return this.httpClient.get(this.url + 'findByCode/' + code);
  }

  public save(process: Process): Observable<any> {
    return this.httpClient.post(this.url + 'save', process);
  }

  public update(process: Process): Observable<any> {
    return this.httpClient.put(this.url + 'update/' + process.uid, process, this.headers);
  }

  public delete(id: string): Observable<any> {
    return this.httpClient.delete(this.url + 'delete/' + id, this.headers);
  }

  public sendDocuments(sendDocumentsDTO: SendDocumentsDTO): Observable<any> {
    return this.httpClient.post(this.url + 'receiveFromClient', sendDocumentsDTO);
  }

  public findLastest(processType: string): Observable<any> {
    return this.httpClient.get(this.url + 'lastest/' + processType, this.headers);
  }

}
