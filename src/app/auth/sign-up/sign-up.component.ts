import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { FirebaseError } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, User, UserCredential, updateProfile, Auth } from "firebase/auth";

export const passwordMatchingValidatior: ValidatorFn = (confirmPassword: AbstractControl): ValidationErrors | null => {
  const password = confirmPassword.parent?.get('password');
  const matchedError = password?.value === confirmPassword?.value ? null : { notmatched: {value: true} };
  return matchedError;
};

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  registrationFormGroup = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      displayName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required, passwordMatchingValidatior])
    }
  );


  @Output() signedUp = new EventEmitter<UserCredential>();
  @Output() cancelClicked = new EventEmitter();

  signup() {
    if (this.registrationFormGroup.invalid) {
      return;
    }

    const email = this.registrationFormGroup.get('email')?.value;
    const password = this.registrationFormGroup.get('password')?.value;

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password).then(() => {
      this.addUser(auth).then(() => this.signedUp.emit());
    }).catch((error: FirebaseError) => {
      if (error.code === 'auth/email-already-in-use') {
        this.registrationFormGroup.get('email')?.setErrors({alreadyExists: true})
      }
      if (error.code === 'auth/weak-password') {
        this.registrationFormGroup.get('password')?.setErrors({weakPassword: true})
      }
    })
  }

  cancel() {
    this.cancelClicked.emit();
  }

  private addUser(auth: Auth) {
    return updateProfile(auth.currentUser!, {
      displayName: this.registrationFormGroup.get('displayName')?.value,
    });
  }

}
