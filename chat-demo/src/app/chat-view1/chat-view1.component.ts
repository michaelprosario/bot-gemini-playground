import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { IMessage, IChatCommand, IChatResponse, ContentItem } from '../core/chat-view-interfaces';
import { IChatService } from "../core/IChatService";

@Component({
  selector: 'app-chat-view1',
  standalone: true,
  imports: [CommonModule, FormsModule, ChatMessageComponent],
  templateUrl: './chat-view1.component.html',
  styleUrl: './chat-view1.component.scss'
})
export class ChatView1Component {
  @Input() chatService: IChatService | undefined;
  @Input() agentName: string = 'Unknown';
  messages: IMessage[] = [];
  contentItems: ContentItem[] = [];
  messageContent: string = '';

  constructor(private httpClient: HttpClient) { }

  ngOnInit() 
  {
    this.onEnterSendMessage();
  }

  private onEnterSendMessage() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.sendMessage();
      }
    });
  }

  getMessageFromUser() : IMessage{
    const message: IMessage = {
      sender: 'user',
      content: this.messageContent,
      time: new Date().toLocaleTimeString()
    } 

    return message;
  }

  async sendMessage() 
  {
    const message: IMessage = this.getMessageFromUser();    
    this.messages.push(message);

    // create content item for history
    const contentItem: ContentItem = {
      role: 'user',
      parts: [{ text: this.messageContent }]
    }

    this.contentItems.push(contentItem);

    const chatCommand: IChatCommand = this.makeChatCommand()

    if(this.chatService)
    {
      let chatResponse = await this.chatService.executeChatCommand(chatCommand) as IChatResponse;

      const responseMessage: IMessage = {
        sender: this.agentName,
        content: chatResponse.content,
        time: new Date().toLocaleTimeString()
      }
  
      this.messages.push(responseMessage);

      // create content item for history for model response
      const contentItem: ContentItem = {
        role: 'model',
        parts: [{ text: chatResponse.content }]
      }

      this.contentItems.push(contentItem);
  
      this.resetChatView();  
    }
  }

  private resetChatView() {
    this.messageContent = '';

    setTimeout(() => {
      const chatInput = document.getElementById('chatInput');
      if (chatInput) {
        chatInput.focus();
      }
    }, 0);

    setTimeout(() => {
      const divMessages = document.getElementById('divMessages');
      if (divMessages) {
        divMessages.scrollTop = divMessages.scrollHeight;
        const lastMessage = divMessages.lastElementChild;
        if (lastMessage) {
          lastMessage.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 0);
  }

  private makeChatCommand(): IChatCommand {
    return {
      input: this.messageContent,
      contentItems: this.contentItems
    };
  }
}
