import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, signOut } from 'firebase/auth';
import { AuthService } from './auth/auth.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'punpgames';

  user: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    
    this.authService.getUser().subscribe(user => {
      this.user = user;
    });
  }

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }

  onSignout() {
    signOut(getAuth());
  }
}
