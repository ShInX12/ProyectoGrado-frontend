import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-enable-chat-message',
  templateUrl: './enable-chat-message.component.html',
  styleUrls: ['./enable-chat-message.component.css']
})
export class EnableChatMessageComponent implements OnInit {

  @Input() processId: string;
  @Output() enabled: EventEmitter<boolean> = new EventEmitter();

  constructor(public chatService: ChatService) { }

  ngOnInit(): void { }

  public enableChat(): void {
    this.chatService.enableProcessChat(this.processId).subscribe(
      () => this.enabled.emit(true),
      error => console.warn(error.error.message)
    );
  }

}
