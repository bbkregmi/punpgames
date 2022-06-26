import { Injectable } from "@angular/core";
import { Unsubscribe } from "firebase/auth";
import { addDoc, arrayUnion, collection, doc, DocumentData, DocumentSnapshot, getDoc, getFirestore, onSnapshot, QueryDocumentSnapshot, updateDoc } from "firebase/firestore";
import { UserService } from "../user.service";

@Injectable()
export class ChatService {

  private db = getFirestore();

  constructor(
    private userService: UserService
  ) {}

  async getChatGroupsForUser(userData: any) {
    const allGroupPromises: Promise<DocumentSnapshot<DocumentData>>[] = [];
    userData.chatGroupIds.forEach((id: string) => {
      const groupPromiseRef = doc(this.db, "chatgroups", id);
      const groupPromise = getDoc(groupPromiseRef);
      allGroupPromises.push(groupPromise);
    });

    return Promise.all(allGroupPromises);
  }

  async createChatGroupForUser(usersDocumentData: QueryDocumentSnapshot<DocumentData>[]) {
    const users = usersDocumentData.map(userDocumentData => userDocumentData.data());

    const groupDocRef = await addDoc(collection(this.db, "chatgroups"), {
      members: users,
      messages: []
    });

    // Update users to include this chat group into their list of chatgroups
    for (let userDocumentData of usersDocumentData) {
      const user = userDocumentData.data();
      if (user['chatGroupIds']) {
        user['chatGroupIds'].push(groupDocRef.id)
      } else {
        user['chatGroupIds'] = [groupDocRef.id];
      } 
      this.userService.updateUser(userDocumentData.id, user);
    }
  }

  getChatMessagesForGroup(chatGroupId: string) {

  }

  sendChatMessageToGroup(chatGroupId: string, chatMessage: {message: string, userId: string, timestamp: number, userName: string}) {
    const chatGroupUpdateRef = doc(this.db, "chatgroups", chatGroupId);
    updateDoc(chatGroupUpdateRef, {
      messages: arrayUnion(chatMessage)
    })
  }

  getChatMessageUpdates(chatGroups: QueryDocumentSnapshot<DocumentData>[], onUpdateCallback: (snapshot: DocumentSnapshot<DocumentData>) => void) {
    const unsubscribeList: Unsubscribe[] = [];

    chatGroups.forEach(group => {
      const unSubscriber = onSnapshot(
        doc(this.db, "chatgroups", group.id), 
        {includeMetadataChanges: true},
        onUpdateCallback
      );

      unsubscribeList.push(unSubscriber);
    });

    return unsubscribeList;
  }
}