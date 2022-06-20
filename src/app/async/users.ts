import { Injectable } from "@angular/core";
import { DataSnapshot, getDatabase, onValue, ref, set } from "firebase/database";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  db = getDatabase();

  constructor(
  ) {}

  getUser(uid: string, callback: (spanshot: DataSnapshot) => void) {
    const userRef = ref(this.db, 'users/' + uid);
    onValue(userRef, callback);
  }

  createUser(user: any) {
    return set(ref(this.db, 'users/' + user.uid), {
      displayName: user.displayName,
      email: user.email,
      uid: user.uid
    });  
  }
}