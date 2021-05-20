import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  public menuAdministrador = [
    { title: 'Inicio', url: '', icon: 'bx bx-grid-alt' },
    { title: 'Casos', url: 'procesos', icon: 'bx bx-briefcase' },
    { title: 'Movimientos', url: 'movimientos', icon: 'bx bx-collection' },
    { title: 'Clientes', url: 'clientes', icon: 'bx bx-user-pin' },
    { title: 'Usuarios', url: 'usuarios', icon: 'bx bx-user' },
    { title: 'Compañia', url: 'compania', icon: 'bx bx-store' },
    { title: 'Perfil', url: 'perfil', icon: 'bx bx-user-circle' },
    { title: 'Calendario', url: 'calendario', icon: 'bx bx-calendar' }
  ];

  public menuAbogado = [
    { title: 'Inicio', url: '', icon: 'bx bx-grid-alt' },
    { title: 'Casos', url: 'procesos', icon: 'bx bx-briefcase' },
    { title: 'Movimientos', url: 'movimientos', icon: 'bx bx-collection' },
    { title: 'Clientes', url: 'clientes', icon: 'bx bx-user-pin' },
    { title: 'Perfil', url: 'perfil', icon: 'bx bx-user-circle' },
    { title: 'Calendario', url: 'calendario', icon: 'bx bx-calendar' }
  ];

  public menuAsistente = [
    { title: 'Inicio', url: '', icon: 'bx bx-grid-alt' },
    { title: 'Casos', url: 'procesos', icon: 'bx bx-briefcase' },
    { title: 'Movimientos', url: 'movimientos', icon: 'bx bx-collection' },
    { title: 'Clientes', url: 'clientes', icon: 'bx bx-user-pin' },
    { title: 'Perfil', url: 'perfil', icon: 'bx bx-user-circle' }
  ];

  public menuCliente = [
    { title: 'Inicio', url: '', icon: 'bx bx-grid-alt' },
    { title: 'Mis procesos', url: 'procesos', icon: 'bx bx-briefcase' },
    { title: 'Perfil', url: 'perfil', icon: 'bx bx-user-circle' }
  ];

  constructor() { }

}
