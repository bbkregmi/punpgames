import { Injectable } from "@angular/core";
import { getAuth, User } from "firebase/auth";
import { child, DataSnapshot, get, getDatabase, onValue, ref, set } from "firebase/database";
import { collection, addDoc, getFirestore, query, where, getDocs, doc, updateDoc } from "firebase/firestore"; 

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private db = getFirestore();

  constructor() {}

  createUser(user: User) {

   return addDoc(collection(this.db, "users"), {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      chatGroupIds: [],
    });
  }

  updateUser(userId: string, updatedUser: any) {
    const userRef = doc(this.db, "users", userId);
    return updateDoc(userRef, updatedUser);
  }

  async getUserFromId(id: string | undefined) {
    if (!id) return;

    const userQuery = query(collection(this.db, "users"), where("uid", "==", id));
    const userQuerySnapshot = await getDocs(userQuery);
    if (userQuerySnapshot.empty) return;

    return userQuerySnapshot.docs[0];
  }

  async getUsersFromDisplayName(name: string | undefined) {
    if (!name || !name.length) return;
    const userQuery = query(collection(this.db, "users"), where("displayName", ">=", name), where("displayName", "<=", name+ '\uf8ff'));
    const userQuerySnapshots = await getDocs(userQuery);
    if (userQuerySnapshots.empty) return;

    return userQuerySnapshots.empty ? [] : userQuerySnapshots.docs;
  }

  /**
   * Get current authenticated user data from real time database
   * @param userId 
   */
  getCurrentUser() {
    const user = getAuth().currentUser;
    return this.getUserFromId(user?.uid);
  }
}