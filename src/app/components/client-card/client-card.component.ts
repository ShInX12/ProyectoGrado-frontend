import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../../models/client';

@Component({
  selector: 'app-client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.css']
})
export class ClientCardComponent implements OnInit {

  @Input() client: Client;

  constructor(public router: Router) { }

  ngOnInit(): void { }

}
