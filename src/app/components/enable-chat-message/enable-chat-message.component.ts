import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-enable-chat-message',
  templateUrl: './enable-chat-message.component.html',
  styleUrls: ['./enable-chat-message.component.scss']
})
export class EnableChatMessageComponent {

  @Input() processId: string;
  @Input() disabled: boolean;
  @Output() enabled: EventEmitter<boolean> = new EventEmitter();

  constructor(public chatService: ChatService) { }

  public enableChat(): void {
    this.chatService.enableProcessChat(this.processId).subscribe(
      () => this.enabled.emit(true),
      error => console.warn(error.error.message)
    );
  }

}
