import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/user/Services/user.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {

  constructor(
    private userService: UserService
  ) { }


  @Input() curropenedStuff: {
    sideBar: string,
    chat: string,
    chatInfo: boolean
  };
  public searchedPotentialUsers: any[] = [];

  searchUsers(event: any) {
    if (event.target.value) {
      const searchTerm = event.target.value;
      this.userService.getPotentialFriends(searchTerm).subscribe((res: any) => {
        if (res.success) {
          this.searchedPotentialUsers = res.data;
        }
      });
    }
  }

}
