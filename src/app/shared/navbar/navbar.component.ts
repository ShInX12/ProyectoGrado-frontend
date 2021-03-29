import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  public menu = [];

  constructor(public router: Router,
              public authService: AuthService,
              public navbarService: NavbarService) { }

  ngOnInit(): void {
    this.loadMenu();
  }

  public loadMenu(): void {

    switch (this.authService.user.user_type_id) {

      case environment.USER_TYPE_ADMINISTRADOR:
        this.menu = this.navbarService.menuAdministrador;
        break;

      case environment.USER_TYPE_ABOGADO:
        this.menu = this.navbarService.menuAbogado;
        break;

      case environment.USER_TYPE_ASISTENTE:
        this.menu = this.navbarService.menuAsistente;
        break;
    }

  }

  public logout(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

}
