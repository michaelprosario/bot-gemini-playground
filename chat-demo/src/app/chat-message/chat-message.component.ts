import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss'
})
export class ChatMessageComponent {

  // add annotations required for angular inputs
  // add 3 inputs: sender, content, and time
  @Input() sender: string = '';
  @Input() content: string = '';
  @Input() time: string = '';
  
}
