import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  public menu = [];

  constructor(public router: Router,
              public navbarService: NavbarService) { }

  ngOnInit(): void {
    this.loadMenu();
  }

  public loadMenu(): void {
    this.menu = this.navbarService.menu;
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

}
