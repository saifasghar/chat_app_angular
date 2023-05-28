import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  @Input() curropenedStuff: {
    sideBar: string,
    chat: string,
    chatInfo: boolean
  };

}
