import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { AuthService, Role } from '../../services/auth.service';
import { NavbarService } from '../../services/navbar.service';
import { Company } from '../../models/company';
import { Router } from '@angular/router';
import { Person } from 'src/app/models/person';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, AfterViewInit {

  public menu = [];
  public company: Company = this.authService.company;
  public person: Person = this.authService.person;
  public role: Role = this.authService.role;

  public noFoto = '../../../assets/img/no-avatar.jpg';
  public noLogo = '../../../assets/img/no-logo.png';

  @ViewChild('btn') btn: ElementRef;
  @ViewChild('sidebar') sidebar: ElementRef;
  @ViewChild('content') content: ElementRef;

  constructor(private navbarService: NavbarService,
              public router: Router,
              private authService: AuthService,
              public breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.checkBreakpoint();
    this.loadMenu();
  }

  ngAfterViewInit(): void {
    this.checkInitialBreakpoint();
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

  public checkBreakpoint(): void {
    this.breakpointObserver
      .observe([Breakpoints.XSmall])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.sidebar?.nativeElement?.classList.add('d-none');
        } else {
          this.sidebar?.nativeElement?.classList.remove('d-none');
        }
      });
  }

  public checkInitialBreakpoint(): void {
    if (this.content.nativeElement.offsetWidth <= 497){
      this.sidebar?.nativeElement?.classList.add('d-none');
    }
  }

  public onClickBtn(): void {

    this.sidebar.nativeElement.classList.toggle('active');
    if (this.btn.nativeElement.classList.contains('bx-menu')) {
      this.btn.nativeElement.classList.replace('bx-menu', 'bx-menu-alt-right');
    } else {
      this.btn.nativeElement.classList.replace('bx-menu-alt-right', 'bx-menu');
    }
  }

  // public onClickSearch(): void {
  //   this.sidebar.nativeElement.classList.toggle('active');
  // }

  public logout(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

}
