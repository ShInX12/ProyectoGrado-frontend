import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Message } from '../../models/message';
import { AuthService, Role } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {

  @Input() processId: string;

  public newMessage: Message = new Message('', '', this.authService.person.name, this.authService.person.uid, null, '');

  public messages: Message[] = [];

  public subscriptions: Subscription[] = [];

  constructor(private chatService: ChatService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.findLatestByProcess();
    this.listen();
  }

  public listen(): void {
    const listenSub = this.chatService.listen(this.processId).subscribe(
      message => this.messages.push(message)
    );
    this.subscriptions.push(listenSub);
  }

  public findLatestByProcess(): void {
    this.chatService.findLatestByProcess(this.processId).subscribe(
      data => this.messages = data.messages
    );
  }

  sendMessage(): void {
    this.newMessage.is_lawyer = this.authService.role !== Role.Client;
    this.newMessage.process = this.processId;
    this.chatService.emit('sendMessage', this.newMessage);
    this.newMessage.body = '';
  }

}
