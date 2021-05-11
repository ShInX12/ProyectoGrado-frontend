import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  public menuAdministrador = [
    { title: 'Inicio', url: '', icono: 'bx bx-grid-alt' },
    { title: 'Casos', url: 'procesos', icono: 'bx bx-briefcase' },
    { title: 'Movimientos', url: 'movimientos', icono: 'bx bx-collection' },
    { title: 'Clientes', url: 'clientes', icono: 'bx bx-user-pin' },
    { title: 'Usuarios', url: 'usuarios', icono: 'bx bx-user' },
    { title: 'Compañia', url: 'compania', icono: 'bx bx-store' },
    { title: 'Perfil', url: 'perfil', icono: 'bx bx-user-circle' }
  ];

  public menuAbogado = [
    { title: 'Inicio', url: '', icono: 'bx bx-grid-alt' },
    { title: 'Casos', url: 'procesos', icono: 'bx bx-briefcase' },
    { title: 'Movimientos', url: 'movimientos', icono: 'bx bx-collection' },
    { title: 'Clientes', url: 'clientes', icono: 'bx bx-user-pin' },
    { title: 'Perfil', url: 'perfil', icono: 'bx bx-user-circle' }
  ];

  public menuAsistente = [
    { title: 'Inicio', url: '', icono: 'bx bx-grid-alt' },
    { title: 'Casos', url: 'procesos', icono: 'bx bx-briefcase' },
    { title: 'Movimientos', url: 'movimientos', icono: 'bx bx-collection' },
    { title: 'Clientes', url: 'clientes', icono: 'bx bx-user-pin' },
    { title: 'Perfil', url: 'perfil', icono: 'bx bx-user-circle' }
  ];

  public menuCliente = [
    { title: 'Inicio', url: '', icono: 'bx bx-grid-alt' },
    { title: 'Mis procesos', url: 'procesos', icono: 'bx bx-briefcase' },
    { title: 'Perfil', url: 'perfil', icono: 'bx bx-user-circle' }
  ];

  constructor() { }

}
