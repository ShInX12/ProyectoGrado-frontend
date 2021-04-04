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

  ngOnInit(): void { // TODO: Quitar comentarios y hacer que funcione bien la redireccion
    console.log('Redirect...');
    this.redirect();
  }

  redirect(): void {

    console.log('Pages:');
    console.log('Rol actual: ' + this.authService.role);
    console.log('Rol administrador: ' + Role.Administrator);

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
