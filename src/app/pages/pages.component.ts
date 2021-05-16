import { Component, OnInit } from '@angular/core';
import { AuthService, Role } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent implements OnInit {

  constructor(public router: Router,
              public authService: AuthService) { }

  ngOnInit(): void {
    this.redirect();
  }

  redirect(): void {

    if (!this.authService.person.enable){
      this.router.navigateByUrl('inactividad');
      return;
    }

    switch (this.authService.role) {

      case Role.Administrator:
        this.router.navigateByUrl(Role.Administrator);
        break;

      case Role.Lawyer:
        this.router.navigateByUrl(Role.Lawyer);
        break;

      case Role.Assistant:
        this.router.navigateByUrl(Role.Assistant);
        break;

      case Role.Client:
        this.router.navigateByUrl(Role.Client);
        break;
    }
  }

}
