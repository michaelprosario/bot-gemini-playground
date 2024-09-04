import { Component } from '@angular/core';
import { MarketingAdvisorChatService } from './marketing-advisor-chat-service';
import { HttpClient } from '@angular/common/http';
import { ChatView1Component } from '../chat-view1/chat-view1.component';

@Component({
  selector: 'app-marketing-advisor-view',
  standalone: true,
  imports: [ChatView1Component],
  templateUrl: './marketing-advisor-view.component.html',
  styleUrl: './marketing-advisor-view.component.scss'
})
export class MarketingAdvisorViewComponent {
  chatService: MarketingAdvisorChatService;
  agentName: string;
  constructor(private httpClient: HttpClient) 
  {
    this.chatService = new MarketingAdvisorChatService(httpClient);
    this.agentName = 'Advisor'
  }
}
