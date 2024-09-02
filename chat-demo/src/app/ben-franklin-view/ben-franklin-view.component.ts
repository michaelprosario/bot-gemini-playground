import { Component } from '@angular/core';
import { BenFranklinChatService } from '../chat-view1/chat-services';
import { HttpClient } from '@angular/common/http';
import { ChatView1Component } from '../chat-view1/chat-view1.component';

@Component({
  selector: 'app-ben-franklin-view',
  standalone: true,
  imports: [ChatView1Component],
  templateUrl: './ben-franklin-view.component.html',
  styleUrl: './ben-franklin-view.component.scss'
})
export class BenFranklinViewComponent {
  chatService: BenFranklinChatService;
  agentName: string;
  constructor(private httpClient: HttpClient) 
  {
    this.chatService = new BenFranklinChatService(httpClient);
    this.agentName = 'Ben Franklin'
  }

}
