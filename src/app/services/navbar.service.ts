import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  public menuAdministrador = [
    { title: 'Inicio Admin', url: '' },
    { title: 'Casos', url: 'procesos' },
    { title: 'Movimientos', url: 'movimientos' },
    { title: 'Clientes', url: 'clientes' },
    { title: 'Usuarios', url: 'usuarios' },
  ];

  public menuAbogado = [
    { title: 'Inicio Abogado', url: '' },
    { title: 'Casos', url: 'procesos' },
    { title: 'Movimientos', url: 'movimientos' },
    { title: 'Clientes', url: 'clientes' },
  ];

  public menuAsistente = [
    { title: 'Inicio Asistente', url: '' },
    { title: 'Casos', url: 'procesos' },
    { title: 'Movimientos', url: 'movimientos' },
    { title: 'Clientes', url: 'clientes' },
  ];

  public menuCliente = [
    { title: 'Inicio Cliente', url: '' },
    { title: 'Mis procesos', url: 'procesos' }
  ];

  constructor() { }

}
