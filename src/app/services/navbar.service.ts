import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  public menuAdministrador = [
    { title: 'Inicio', url: '' },
    { title: 'Casos', url: 'procesos' },
    { title: 'Movimientos', url: 'movimientos' },
    { title: 'Clientes', url: 'clientes' },
    { title: 'Usuarios', url: 'usuarios' },
    { title: 'Compañia', url: 'compania' }
  ];

  public menuAbogado = [
    { title: 'Inicio', url: '' },
    { title: 'Casos', url: 'procesos' },
    { title: 'Movimientos', url: 'movimientos' },
    { title: 'Clientes', url: 'clientes' }
  ];

  public menuAsistente = [
    { title: 'Inicio', url: '' },
    { title: 'Casos', url: 'procesos' },
    { title: 'Movimientos', url: 'movimientos' },
    { title: 'Clientes', url: 'clientes' }
  ];

  public menuCliente = [
    { title: 'Inicio', url: '' },
    { title: 'Mis procesos', url: 'procesos' }
  ];

  constructor() { }

}
