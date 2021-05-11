import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';
import { AuthService, Role } from '../../services/auth.service';
import { Company } from '../../models/company';
import { Person } from 'src/app/models/person';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public menu = [];
  public company: Company = this.authService.company;
  public person: Person = this.authService.person;
  public role: Role = this.authService.role;

  public noFoto: string = '../../../assets/img/no-avatar.jpg';
  public noLogo: string = '../../../assets/img/no-logo.png';

  @ViewChild('btn') btn: ElementRef;
  @ViewChild('sidebar') sidebar: ElementRef;
  @ViewChild('searchBtn') searchBtn: ElementRef;


  constructor(private navbarService: NavbarService,
    public router: Router,
    private authService: AuthService,
    public breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {

    // this.breakpointObserver
    //   .observe(['(max-width: 800px)'])
    //   .subscribe((state: BreakpointState) => {
    //     if (state.matches) {
    //       console.log('match');

    //       this.sidebar.nativeElement.classList.remove('active');

    //     }
    //   });
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

  onClickBtn() {

    this.sidebar.nativeElement.classList.toggle('active');
    if (this.btn.nativeElement.classList.contains('bx-menu')) {
      this.btn.nativeElement.classList.replace('bx-menu', 'bx-menu-alt-right');
    } else {
      this.btn.nativeElement.classList.replace('bx-menu-alt-right', 'bx-menu');
    }
    // this.renderer.addClass(this.sidebar.nativeElement, 'active');
  }

  onClickSearch() {
    this.sidebar.nativeElement.classList.toggle('active');
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

}
