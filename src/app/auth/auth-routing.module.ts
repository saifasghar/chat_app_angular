import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { AccountVerificationComponent } from './Components/account-verification/account-verification.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'account-verification/:token', component: AccountVerificationComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
