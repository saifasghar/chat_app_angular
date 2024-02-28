import { Component, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  constructor(private modalService: BsModalService) { }

  @Input() curropenedStuff: {
    sideBar: string,
    chat: string,
    chatInfo: boolean
  };

  openChatInfo() {
    this.curropenedStuff.chatInfo = !this.curropenedStuff.chatInfo;
  }

}
