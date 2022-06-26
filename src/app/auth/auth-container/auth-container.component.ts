import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserCredential } from 'firebase/auth';
import { take } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-container',
  templateUrl: './auth-container.component.html',
  styleUrls: ['./auth-container.component.scss'],
})
export class AuthContainerComponent {

  mode: 'signin' | 'signup' = 'signin';

  @Output() loggedIn = new EventEmitter<UserCredential>();

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.getUser().pipe(take(1)).subscribe(user => {
      if (user && user.emailVerified) {
        this.router.navigate(['']);
      }
    })
  }

  onSignupSuccess() {
    this.mode = 'signin';
  }
}
