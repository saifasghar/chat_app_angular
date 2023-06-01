import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/user/Services/user.service';
import { StorageObserver } from 'src/app/util/storage.observer';
import { selectedTabs } from 'src/app/util/models/selectedTabs';

@Component({
  selector: 'app-index.js',
  templateUrl: './index.js.component.html',
  styleUrls: ['./index.js.component.css']
})
export class IndexJsComponent {

  constructor(
    private userServices: UserService,
    private modalService: BsModalService,
    private storageObserver: StorageObserver,
    private router: Router,
  ) { }

  @ViewChild('profileModalTemplate') profileModalTemplate: any;
  @ViewChild('mediaModalTemplate') mediaModalTemplate: any;

  public profileModalRef: BsModalRef;
  public mediaModalRef: BsModalRef;
  public openedMediaImage: any = {};
  public allFriends: any = null;
  public allNotifications: any = null;
  public mediaImages: any = [
    {
      src: 'assets/img/chat/1.jpg'
    },
    {
      src: 'assets/img/chat/2.jpg'
    },
    {
      src: 'assets/img/chat/3.jpg'
    },
    {
      src: 'assets/img/chat/4.jpg'
    },
    {
      src: 'assets/img/chat/5.jpg'
    },
    {
      src: 'assets/img/chat/6.jpg'
    },
    {
      src: 'assets/img/chat/7.jpg'
    },
    {
      src: 'assets/img/chat/8.jpg'
    },
    {
      src: 'assets/img/chat/9.jpg'
    },
  ];
  public curropenedStuff: selectedTabs = {
    sideBar: 'messages',
    chat: 'single',
    chatInfo: false,
    infoTabSelected: 'offcanvas-tab-profile'
  };

  openModal(template: any, type: string = 'profile', image: any = {}) {
    if (type == 'profile') {
      this.profileModalRef = this.modalService.show(template);
    } else if (type == 'media') {
      this.openedMediaImage = image;
      this.mediaModalRef = this.modalService.show(template);
    }
  }

  changeCurrOpenedSideBar(type: string) {
    if (type == 'createChat') {

    } else if (type == 'friends' && this.curropenedStuff.sideBar !== 'friends') {
      this.allFriends = null;
      this.fetchSideBarData(type);
    } else if (type == 'messages') {

    } else if (type == 'notifications' && this.curropenedStuff.sideBar !== 'notifications') {
      this.allNotifications = null;
      this.fetchSideBarData(type);
    } else if (type == 'support') {

    } else if (type == 'settings') {

    }
    this.curropenedStuff.sideBar = type;
  }

  fetchSideBarData(type: string) {
    if (type == 'friends') {
      this.userServices.fetchAllFriends().subscribe(response => {
        if (response.success) {
          this.allFriends = response.data.friends;
        }
      });
    } else if (type == 'notifications') {
      this.userServices.fetchAllNotifications().subscribe(response => {
        console.log(response);
        if (response.success) {
          this.allNotifications = response.data.notifications.reverse();
        }
      });
    }
  }

  logoutUser() {
    this.profileModalRef.hide();
    this.storageObserver.deleteAllCookies();
    this.router.navigate(['/auth/login']);
  }

  ngOnInit() {
  }
}
