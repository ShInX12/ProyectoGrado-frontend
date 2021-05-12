import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';
import { AuthService, Role } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  public menu = [];
  // public noLogo = '../../../assets/img/no-logo.png';

  constructor(public router: Router,
              public authService: AuthService,
              public navbarService: NavbarService) { }

  ngOnInit(): void {
    this.loadMenu();
  }

  public loadMenu(): void {

    switch (this.authService.role) {

      case Role.Administrator:
        this.menu = this.navbarService.menuAdministrador;
        break;

      case Role.Lawyer:
        this.menu = this.navbarService.menuAbogado;
        break;

      case Role.Assistant:
        this.menu = this.navbarService.menuAsistente;
        break;

      case Role.Client:
        this.menu = this.navbarService.menuCliente;
        break;
    }

  }

  public logout(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

}
