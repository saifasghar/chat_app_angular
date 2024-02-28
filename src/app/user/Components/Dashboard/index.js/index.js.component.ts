import { Component, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/user/Services/user.service';

@Component({
  selector: 'app-index.js',
  templateUrl: './index.js.component.html',
  styleUrls: ['./index.js.component.css']
})
export class IndexJsComponent {

  constructor(
    private userServices: UserService,
    private modalService: BsModalService,
  ) { }

  @ViewChild('profileModalTemplate') profileModalTemplate: any;

  public profileModalRef: BsModalRef;
  public curropenedStuff: {
    sideBar: string,
    chat: string,
    chatInfo: boolean
  } = {
      sideBar: 'messages',
      chat: 'single',
      chatInfo: false
    };

  openModal(template: any) {
    this.profileModalRef = this.modalService.show(template);
  }

  ngOnInit() {
    // setTimeout(() => {
    //   console.log(this.profileModalTemplate);
    //   console.log(this.profileModalRef);
    //   this.profileModalRef = this.modalService.show(this.profileModalTemplate);
    //   console.log(this.profileModalRef);
    //   setTimeout(() => {
    //     this.modalService.hide();
    //     setTimeout(() => {
    //       this.modalService.show(this.profileModalTemplate);
    //     }, 2000)
    //   }, 2000)
    // }, 2000);
    // this.userServices.test().subscribe(response => {
    //   if (response.success) {
    //     console.log(response);
    //   }
    // });
  }

  logout() {

  }
}
