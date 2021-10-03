import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Message } from '../../models/message';
import { AuthService, Role } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit, OnChanges {

  @Input() processId: string;
  @Input() reload: boolean;
  @Input() rounded = false;
  public containerChat: HTMLElement;

  public newMessage: Message = new Message('', '', this.authService.person.name, this.authService.person.uid, null, '');

  public messages: Message[] = [];

  public subscriptions: Subscription[] = [];

  constructor(private chatService: ChatService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.containerChat = document.getElementById('container-chat');
    this.findLatestByProcess();
    this.listen();
    setTimeout(() => this.containerChat.scrollTop = this.containerChat.scrollHeight, 190);
  }

  ngOnChanges(): void {
    this.findLatestByProcess();
  }

  public listen(): void {
    const listenSub = this.chatService.listen(this.processId).subscribe(
      message => {
        this.messages.push(message);
        setTimeout(() => this.containerChat.scrollTop = this.containerChat.scrollHeight, 190);
      }
    );
    this.subscriptions.push(listenSub);
  }

  public findLatestByProcess(): void {
    this.chatService.findLatestByProcess(this.processId).subscribe(
      data => {
        this.messages = data.messages;
        setTimeout(() => this.containerChat.scrollTop = this.containerChat.scrollHeight, 190);
      }
    );
  }

  sendMessage(): void {
    this.newMessage.is_lawyer = this.authService.role !== Role.Client;
    this.newMessage.process = this.processId;
    this.chatService.emit('sendMessage', this.newMessage);
    this.newMessage.body = '';
  }

}
