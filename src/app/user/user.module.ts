import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SideBarComponent } from './Components/Dashboard/side-bar/side-bar.component';
import { ChatComponent } from './Components/Dashboard/chat/chat.component';
import { IndexJsComponent } from './Components/Dashboard/index.js/index.js.component';


@NgModule({
  declarations: [
    SideBarComponent,
    ChatComponent,
    IndexJsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
