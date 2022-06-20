import { Component } from '@angular/core';
import { UserCredential } from 'firebase/auth';
import { DataSnapshot } from 'firebase/database';
import { UserService } from '../async/users';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  user: any;

  constructor(
    private userService: UserService
  ) { }

  onLoggedIn(userCreds: UserCredential) {
    
    this.userService.getUser(userCreds.user.uid, (snapshot: DataSnapshot) => {
      if (!snapshot.exists()) {
        return;
      }
      console.log(this);
      this.user = snapshot.val();
    });
  }

  onSignout() {
    this.user = null;
  }
}
