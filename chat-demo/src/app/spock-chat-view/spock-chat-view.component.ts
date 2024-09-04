import { Component } from '@angular/core';
import { ChatView1Component } from '../chat-view1/chat-view1.component';
import { SpockChatService } from "../chat-view1/SpockChatService";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-spock-chat-view',
  standalone: true,
  imports: [ChatView1Component],
  templateUrl: './spock-chat-view.component.html',
  styleUrl: './spock-chat-view.component.scss'
})
export class SpockChatViewComponent {
  chatService: SpockChatService;
  agentName: string;
  constructor(private httpClient: HttpClient) 
  {
    this.chatService = new SpockChatService(httpClient);
    this.agentName = 'Spock'
  }
}
