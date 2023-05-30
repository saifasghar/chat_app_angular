import { Component } from '@angular/core';
import { Validator } from 'src/app/util/validator/validator';
import { AuthService } from '../../Services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  constructor(
    private validator: Validator,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toast: HotToastService
  ) { }

  public password: string = '';
  public recievedToken: string | null = '';
  public validation: any = {
    password: {
      isNotEmpty: true,
      isMinLength: true
    }
  };

  setPassword(event: any) {
    this.password = event.target.value;
  }

  submitPassword() {
    this.recievedToken = this.route.snapshot.paramMap.get('token');
    this.validation['password']['isNotEmpty'] = this.password.trim().length > 0;
    this.validation['password']['isMinLength'] = this.password.trim().length > 7;
    if (this.validator.isValid(this.validation)) {
      this.authService.resetPassword({ token: this.recievedToken, password: this.password }).subscribe(response => {
        console.log(response);
        if (response.success) {
          this.toast.success('Password has been reset.');
          this.router.navigate(['/auth/login']);
        } else {
          if (response.message == 'Token has expired or is invalid') {
            this.toast.error('This link has expired.');
          } else {
            this.toast.error(response.message);
          }
          this.router.navigate(['auth/reset-password']);
        }
      });
    }
  }
}
