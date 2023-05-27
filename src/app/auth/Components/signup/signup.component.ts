import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { Validator } from 'src/app/util/validator/validator';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    private validator: Validator,
    private toast: HotToastService
  ) { }

  @ViewChild('signupForm') signupForm: NgForm;
  public emailAlreadyExists: boolean = false;
  public validation: any = {
    name: {
      isNotEmpty: true,
      isMinLength: true
    },
    email: {
      isNotEmpty: true,
      isValid: true
    },
    password: {
      isNotEmpty: true,
      isMinLength: true
    }
  };

  signup() {
    if (this.validationPassed()) {
      this.authService.signup(this.signupForm.form.value).subscribe(response => {
        if (response.success) {
          console.log(response);
          this.toast.success("We've sent you a verification email.");
          // this.router.navigate(['/auth/login']);
        } else {
          if (response.message == 'Email already exists') {
            this.emailAlreadyExists = true;
          }
        }
      });
    }
  }

  validationPassed() {
    this.validation['name']['isNotEmpty'] = this.signupForm.form.value.name.trim().length > 0;
    this.validation['name']['isMinLength'] = this.signupForm.form.value.name.trim().length > 2;
    this.validation['email']['isNotEmpty'] = this.signupForm.form.value.email.trim().length > 0;
    this.validation['email']['isValid'] = this.signupForm.form.value.email.includes('@') && this.signupForm.form.value.email.includes('.');
    this.validation['password']['isNotEmpty'] = this.signupForm.form.value.password.trim().length > 0;
    this.validation['password']['isMinLength'] = this.signupForm.form.value.password.trim().length > 7;
    return this.validator.isValid(this.validation);
  }
}
