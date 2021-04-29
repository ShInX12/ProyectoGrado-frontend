import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../../models/message';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-message-tile',
  templateUrl: './message-tile.component.html',
  styleUrls: ['./message-tile.component.css']
})
export class MessageTileComponent implements OnInit {

  @Input() message: Message;
  public host: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.host = this.message.person_id === this.authService.person.uid;
  }

}
