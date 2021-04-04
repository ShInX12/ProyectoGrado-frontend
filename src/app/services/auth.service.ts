import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { Person } from '../models/person';
import { Client } from '../models/client';
import { Company } from '../models/company';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public person: Person;
  public company: Company;
  public role: Role;
  public url: string;

  constructor(private httpClient: HttpClient,
              private router: Router,
              private ngZone: NgZone) {
    this.url = environment.apiUrl + '/api/login/';
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.person.uid || '';
  }

  get headers(): object {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  setRole(isClient: boolean, person: User): void {
    if (isClient){
      this.role = Role.Client;

    } else {
      switch (person.user_type_id) {

        case environment.USER_TYPE_ADMINISTRADOR:
          this.role = Role.Administrator;
          break;

        case environment.USER_TYPE_ABOGADO:
          this.role = Role.Lawyer;
          break;

        case environment.USER_TYPE_ASISTENTE:
          this.role = Role.Assistant;
          break;
      }
    }
  }

  public saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  public renewToken(): Observable<any> {
    return this.httpClient.get(this.url + 'renew', this.headers)
      .pipe(
        map((response: any) => {
          this.saveToken(response.token);
          this.person = response.is_client ? response.person as Client : response.person as User;
          this.company = response.company;
          this.setRole(response.is_client, response.person as User);
          return true;
        }),
        catchError(() => of(false))
      );
  }

  public login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.httpClient.post(this.url, body, this.headers);
  }

  public registerUserWithCompany(user: User, company: Company): Observable<any> {
    const body = { user, company };
    return this.httpClient.post(this.url + 'registerUserWithCompany', body);
  }

  public logout(): void {
    localStorage.removeItem('token');

    this.ngZone.run(() => {
      this.router.navigateByUrl('login');
    });
  }
}

export enum Role {
  Administrator = 'administrador',
  Lawyer = 'abogado',
  Assistant = 'asistente',
  Client = 'cliente'
}
