import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService) { }
  test() {
    this.authService.test().subscribe(response => {
      console.log(response);
    })
  }
}
