import { Component } from '@angular/core';
import { UserService } from 'src/app/user/Services/user.service';

@Component({
  selector: 'app-index.js',
  templateUrl: './index.js.component.html',
  styleUrls: ['./index.js.component.css']
})
export class IndexJsComponent {

  constructor(private userServices: UserService) { }

  public curropenedStuff: {
    sideBar: string,
    chat: string,
    chatInfo: boolean
  } = {
      sideBar: 'messages',
      chat: 'single',
      chatInfo: false
    };

  ngOnInit() {
    this.userServices.test().subscribe(response => {
      if (response.success) {
        console.log(response);
      }
    });
  }
}
