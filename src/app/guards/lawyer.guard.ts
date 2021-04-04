import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, Role } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LawyerGuard implements CanActivate, CanLoad {

  constructor(private router: Router,
              private authService: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.role === Role.Lawyer){
      return true;
    } else {
      this.router.navigateByUrl(this.authService.role);
    }

    return true;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.role === Role.Lawyer){
      return true;
    } else {
      this.router.navigateByUrl(this.authService.role);
    }

    return true;
  }

}
