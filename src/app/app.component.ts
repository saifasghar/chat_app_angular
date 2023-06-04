import { Component } from '@angular/core';
import { StorageObserver } from './util/storage.observer';
import { Router } from '@angular/router';
import { GlobalService } from './Services/global.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private storageObserver: StorageObserver,
    private globalServices: GlobalService,
    private router: Router,
    private toast: HotToastService
  ) { }

  ngOnInit() {
    let token = this.storageObserver.getCookie('jwt_token');
    if (token) {
      this.globalServices.verifyTokenAuthenticity().subscribe(response => {
        if (response.success) {
          this.router.navigate(['/']);
          this.globalServices.receiveMessage().subscribe(response => {
            console.log(response);
          });
          setTimeout(() => {
            this.globalServices.sendMessage('hello')
          }, 5000);
        } else {
          this.toast.error('Please login first');
          this.router.navigate(['/auth/login']);
        }
      });
    } else {
      this.toast.error('Please login first');
      this.router.navigate(['/auth/login']);
    }

  }
}
