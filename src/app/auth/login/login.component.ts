import { Component, EventEmitter, Output } from '@angular/core';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {FormControl, Validators} from '@angular/forms';
import { FirebaseError } from 'firebase/app';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('',  [Validators.required]);

  @Output() signupClicked = new EventEmitter();

  login(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password).catch((error: FirebaseError) => {
      if (error.code === 'auth/user-not-found') {
        this.emailFormControl.setErrors({userNotFound: true});
      }
      if (error.code === 'auth/wrong-password') {
        this.passwordFormControl.setErrors({wrongpassword: true});
      }
    });
  }

  onSignup() {
    this.signupClicked.emit();
  }
}
