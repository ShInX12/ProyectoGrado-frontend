import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor() { }

  public showSnackBar(text: string): void {
    const snackbar = document.getElementById('snackbar');
    snackbar.append(text);
    snackbar.className = 'show';
    setTimeout(() => {
      snackbar.className = snackbar.className.replace('show', '');
      snackbar.removeChild(snackbar.firstChild);
    }, 3000);
  }
}
