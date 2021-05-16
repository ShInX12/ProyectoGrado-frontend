import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-disabled',
  templateUrl: './user-disabled.component.html',
  styleUrls: ['./user-disabled.component.css']
})
export class UserDisabledComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

}
