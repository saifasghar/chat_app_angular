import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/user/Services/user.service';
import { Validator } from 'src/app/util/validator/validator';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {

  constructor(
    private validator: Validator,
    private userService: UserService,
    private modalService: BsModalService,
    private toast: HotToastService
  ) { }

  @Output() fetchSideBarData: EventEmitter<any> = new EventEmitter();
  @Input() allFriends: any = null;
  @Input() allNotifications: any = null;
  @Input() curropenedStuff: {
    sideBar: string,
    chat: string,
    chatInfo: boolean
  };
  public emailNotRegistered: boolean = false;
  public cannotRequestYourself: boolean = false;
  public requestAlreadySent: boolean = false;
  public friendsModalRef: BsModalRef;
  public validation: any = {
    email: {
      isNotEmpty: true,
      isValid: true
    }
  };

  openModal(template: any, type: string) {
    this.emailNotRegistered = false;
    this.cannotRequestYourself = false;
    this.requestAlreadySent = false;
    this.friendsModalRef = this.modalService.show(template);
  }

  getTime(date: any) {
    const timestamp = new Date(date);
    let timeString = timestamp.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true });
    timeString = timeString.toUpperCase();
    return timeString;
  }

  getMessage(type: string) {
    if (type == 'requestAccepted') {
      return 'Accepted your friend request.';
    } else if (type == 'friendRequest') {
      return 'Sent you a friend request.';
    } else {
      return '';
    }
  }

  sendFriendRequest(form: NgForm) {
    this.emailNotRegistered = false;
    this.cannotRequestYourself = false;
    this.requestAlreadySent = false;
    this.validation['email']['isNotEmpty'] = form.form.value.email.trim().length > 0;
    this.validation['email']['isValid'] = form.form.value.email.includes('@') && form.form.value.email.includes('.');
    if (this.validator.isValid(this.validation)) {
      this.userService.sendFriendRequest({ email: form.form.value.email, message: form.form.value.message }).subscribe(response => {
        if (response.success) {
          this.friendsModalRef.hide();
          this.toast.success('Friend request sent.')
          console.log(response);
        } else {
          if (response.message == 'Invalid email address') {
            this.emailNotRegistered = true;
          } else if (response.message == 'You cannot send request to yourself.') {
            this.cannotRequestYourself = true;
          } else if (response.message == 'Friend request already sent.') {
            this.requestAlreadySent = true;
          }
        }
      });
    }
  }

  confirmFriendRequest(fromEmail: string, id: string) {
    this.userService.confirmFriendRequest({ email: fromEmail, notificationId: id }).subscribe(response => {
      if (response.success) {
        this.fetchSideBarData.emit('notifications');
      }
    });
  }

  clearNotification(id: string) {
    this.userService.clearNotifications(id).subscribe(response => {
      if (response.success) {
        this.allNotifications = response.data;
      }
    })
  }
}
