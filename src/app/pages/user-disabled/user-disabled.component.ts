import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-disabled',
  templateUrl: './user-disabled.component.html',
  styleUrls: ['./user-disabled.component.css']
})
export class UserDisabledComponent {

  constructor(public router: Router) { }

  public logout(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

}
