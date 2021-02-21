import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  public menu = [
    { title: 'Inicio', url: '' },
    { title: 'Casos', url: 'procesos' },
    { title: 'Movimientos', url: 'movimientos' },
    { title: 'Clientes', url: 'clientes' },
  ];

  constructor() { }

}
