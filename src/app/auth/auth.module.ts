import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { FormsModule } from '@angular/forms';
import { Validator } from '../util/validator/validator';
import { HotToastModule } from '@ngneat/hot-toast';
import { AccountVerificationComponent } from './Components/account-verification/account-verification.component';
import { SharedModule } from '../shared/shared.module';
import { StorageObserver } from '../util/storage.observer';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';



@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    AccountVerificationComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    HotToastModule.forRoot(),
    SharedModule
  ],
  providers: [Validator, StorageObserver],
})
export class AuthModule { }
