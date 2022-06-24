import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { BehaviorSubject } from "rxjs";


@Injectable()
export class AuthService {

  _currentUserSubject = new BehaviorSubject<User | null>(null);

  constructor(
    private router: Router
  ) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this._currentUserSubject.next(user);
      if (user) {
        this.router.navigate(['home']);
      } else {
        this.router.navigate(['']);
      }
    })
  }

  getUser() {
    return this._currentUserSubject.asObservable();
  }
}