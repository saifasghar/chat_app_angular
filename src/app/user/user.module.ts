import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SideBarComponent } from './Components/Dashboard/side-bar/side-bar.component';
import { ChatComponent } from './Components/Dashboard/chat/chat.component';
import { IndexJsComponent } from './Components/Dashboard/index.js/index.js.component';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    SideBarComponent,
    ChatComponent,
    IndexJsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ModalModule.forRoot(),
  ]
})
export class UserModule { }
