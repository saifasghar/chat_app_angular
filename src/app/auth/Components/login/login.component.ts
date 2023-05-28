import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Validator } from 'src/app/util/validator/validator';
import { HotToastService } from '@ngneat/hot-toast';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageObserver } from 'src/app/util/storage.observer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private authService: AuthService,
    private validator: Validator,
    private toast: HotToastService,
    private storageObserver: StorageObserver,
    private router: Router,
  ) { }

  @ViewChild('loginForm') loginForm: NgForm;

  public incorrectPass: boolean = false;
  public incorrectEmail: boolean = false;
  public validation: any = {
    email: {
      isNotEmpty: true,
      isValid: true
    },
    password: {
      isNotEmpty: true
    }
  }

  loginUser() {
    if (this.validationPassed()) {
      this.authService.login(this.loginForm.value).subscribe(response => {
        if (response.success) {
          this.storageObserver.setCookie('jwt_token', response.data.jwt_token, 7);
          this.router.navigate(['/user/dashboard']);
        } else {
          if (response.message == 'Incorrect Password') {
            this.incorrectPass = true;
          } else if (response.message == 'Email not found') {
            this.incorrectEmail = true;
          } else {
            this.toast.error(response.message);
          }
        }
      });
    }
  }

  validationPassed() {
    this.validation['email']['isNotEmpty'] = this.loginForm.form.value.email.trim().length > 0;
    this.validation['email']['isValid'] = this.loginForm.form.value.email.includes('@') && this.loginForm.form.value.email.includes('.');
    this.validation['password']['isNotEmpty'] = this.loginForm.form.value.password.trim().length > 0;
    return this.validator.isValid(this.validation);
  }
}
