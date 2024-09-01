import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatMessageComponent } from '../chat-message/chat-message.component';

interface IMessage {
  sender: string;
  content: string;
  time: string;
}

interface IChatCommand {
  input: string;
}

interface IChatResponse {
  content: string;
}

@Component({
  selector: 'app-chat-view1',
  standalone: true,
  imports: [CommonModule, FormsModule, ChatMessageComponent],
  templateUrl: './chat-view1.component.html',
  styleUrl: './chat-view1.component.scss'
})
export class ChatView1Component {

  // create a list of messages using IMessage interface.  Make 5 messages
  messages: IMessage[] = [

  ];
  messageContent: string = '';

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {

    // when the user presses the enter key, send the message
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.sendMessage();
      }
    });
  }

  // write method to make http POST request to localhost:3000/app/benFranklinChat
  // The input to this method will accept a string message
  chatUrl: string = '/app/benFranklinChat';
  async executeBenFranklinChat(message: IChatCommand) {
    return await this.httpClient.post(this.chatUrl, message).toPromise();
  }


  async sendMessage() 
  {
    // create message object with sender, content, and time
    const message: IMessage = {
      sender: 'Me',
      content: this.messageContent,
      time: new Date().toLocaleTimeString()
    } 
    
    this.messages.push(message);

    // create chat command object with input
    const chatCommand: IChatCommand = {
      input: this.messageContent
    }
    let chatResponse = await this.executeBenFranklinChat(chatCommand) as IChatResponse;

    // create message object with sender, content, and time
    const responseMessage: IMessage = {
      sender: 'BenFranklin',
      content: chatResponse.content,
      time: new Date().toLocaleTimeString()
    }

    this.messages.push(responseMessage);

    // clear the message content
    this.messageContent = '';

    // scroll the divChatBox to the bottom

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
}
