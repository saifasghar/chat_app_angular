import { Component } from '@angular/core';
import { Validator } from 'src/app/util/validator/validator';
import { AuthService } from '../../Services/auth.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  constructor(
    private validator: Validator,
    private authService: AuthService,
    private toast: HotToastService
  ) { }

  public email: string = '';
  public emailNotFound: boolean = false;
  public validation: any = {
    email: {
      isNotEmpty: true,
      isValid: true
    }
  };

  setEmail(event: any) {
    this.email = event.target.value;
    this.emailNotFound = false;
  }

  submitEmail() {
    this.validation['email']['isNotEmpty'] = this.email.trim().length > 0;
    this.validation['email']['isValid'] = this.email.includes('@') && this.email.includes('.');
    if (this.validator.isValid(this.validation)) {
      this.authService.sendResetPasswordLink(this.email).subscribe(response => {
        if (response.success) {
          this.toast.success('Email has been sent for resetting passeord');
          console.log(response);
        } else {
          if (response.message = 'User not found') {
            this.emailNotFound = true;
          } else {
            this.toast.error(response.message);
          }
        }
      });
    }
  }

}
