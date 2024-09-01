import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface IMessage {
  sender: string;
  content: string;
  time: string;
}

@Component({
  selector: 'app-chat-view1',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-view1.component.html',
  styleUrl: './chat-view1.component.scss'
})
export class ChatView1Component {

  // create a list of messages using IMessage interface.  Make 5 messages
  messages: IMessage[] = [
    { sender: 'John', content: 'Hello', time: '12:00' },
    { sender: 'Jane', content: 'Hi', time: '12:01' },
    { sender: 'John', content: 'How are you?', time: '12:02' },
    { sender: 'Jane', content: 'I am good, thank you', time: '12:03' },
    { sender: 'John', content: 'That is great to hear', time: '12:04' }
  ];
  messageContent: string = '';

  constructor() { }

  ngOnInit() {
  }

  sendMessage() { 
    alert(this.messageContent)
  }
}
