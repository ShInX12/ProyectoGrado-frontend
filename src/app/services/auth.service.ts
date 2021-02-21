import { Injectable, NgZone } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: User;
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
    return this.user.uid || '';
  }

  get headers(): object {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  public saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  public renewToken(): Observable<any> {
    return this.httpClient.get(this.url + 'renew', this.headers)
      .pipe(
        map((response: any) => {
          this.saveToken(response.token);
          this.user = response.user;
          return true;
        }),
        catchError(() => of(false))
      );
  }

  public login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.httpClient.post(this.url, body, this.headers);
  }

  public logout(): void {
    localStorage.removeItem('token');

    this.ngZone.run(() => {
      this.router.navigateByUrl('login');
    });
  }
}
