import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('',  [Validators.required]);


  constructor() { }

  signup(email: string, password: string) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password).then(userCreds => {
      const user = userCreds.user;
      console.log(user);
    }).catch(error => {
      console.log(error);
    })
  }

}
