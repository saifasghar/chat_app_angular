import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-account-verification',
  templateUrl: './account-verification.component.html',
  styleUrls: ['./account-verification.component.css']
})
export class AccountVerificationComponent {

  constructor(
    private router: Router,
    private toast: HotToastService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  public recievedToken: string | null = '';

  ngOnInit() {

    this.recievedToken = this.route.snapshot.paramMap.get('token');

    let timeStart = new Date().getTime();

    this.authService.verifyAccount(this.recievedToken).subscribe(response => {
      if (response.success) {
        let timeEnd = new Date().getTime();
        if ((timeEnd - timeStart) < 2500) {
          setTimeout(() => {
            this.toastAndRedirect();
          }, 2500);
        } else {
          this.toastAndRedirect();
        }
      } else {
        this.toastAndRedirect('failed', response.message);
      }
    });
  }

  toastAndRedirect(condition: string = 'success', message: string = '') {
    if (condition == 'success') {
      this.toast.success("Account verified successfully.");
      this.router.navigate(['/auth/login']);
    } else {
      this.toast.error(message, { dismissible: true, autoClose: false });
    }
  }

}
