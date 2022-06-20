import { Component, EventEmitter, Output } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, UserCredential, User } from "firebase/auth";
import {FormControl, Validators} from '@angular/forms';
import { UserService } from 'src/app/async/users';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('',  [Validators.required]);

  @Output() loggedIn = new EventEmitter();

  constructor(
    private userService: UserService
  ) {}

  login(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password).then(userCreds => {
      this.loggedIn.emit(userCreds);
    }).catch(error => {
      console.error(error);
    });
  }

  signup(email: string, password: string) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password).then(userCreds => {
      const user = userCreds.user;
      this.addUser(user)
      console.log(user);
    }).catch(error => {
      console.log(error);
    })
  }

  private addUser(user: User) {
    this.userService.createUser(
      {
        uid: user.uid,
        email: user.email,
        displayName: 'Bibek Regmi',
      }
    ).then(() => {
      console.log('User Created');
      this.loggedIn.emit(user);
    }).catch(err => {
      console.log('error', err);
    })
  }
}
