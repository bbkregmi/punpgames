import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserCredential } from 'firebase/auth';

@Component({
  selector: 'app-auth-container',
  templateUrl: './auth-container.component.html',
  styleUrls: ['./auth-container.component.scss']
})
export class AuthContainerComponent {

  mode: 'signin' | 'signup' = 'signin';

  @Output() loggedIn = new EventEmitter<UserCredential>();

  constructor() { }

  onLoggedInSuccess(userCredentials: UserCredential) {
    this.loggedIn.emit(userCredentials);
  }

  onSignupSuccess(userCredentials: UserCredential) {
    this.loggedIn.emit(userCredentials);
  }
}
