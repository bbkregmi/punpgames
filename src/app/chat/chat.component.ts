import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Unsubscribe } from 'firebase/auth';
import { DocumentData, DocumentSnapshot, QueryDocumentSnapshot } from 'firebase/firestore';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { UserService } from '../user.service';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [ ChatService ],
})
export class ChatComponent implements OnInit, OnDestroy {

  @ViewChild('userSearchInput')
  userSearchInput!: ElementRef;

  dbUser: any;
  userData: any;
  chatGroups: any[] = [];
  displayedChatGroup: any = undefined;

  chatUnsubscriptions: Unsubscribe[] = [];

  get currentGroupMessages() {
    return this.displayedChatGroup?.data()?.messages;
  }

  private readonly userSearchSubject = new Subject<string | undefined>();
  searchedUser: QueryDocumentSnapshot<DocumentData>[] | undefined = [];

  sidenavMode: 'groupList' | 'userSearch' = 'groupList';

  constructor(
    private chatService: ChatService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.fetchUser();

    this.userSearchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe((searchQuery) => this.userService.getUsersFromDisplayName(searchQuery)?.then((snapshot) => {
      this.searchedUser = snapshot
    }))
  }

  ngOnDestroy() {
    if (this.chatUnsubscriptions.length) {
      this.chatUnsubscriptions.forEach(unsubscriber => unsubscriber());
    }
  }

  onSearchUserFocus() {
    setTimeout(() => {
      this.sidenavMode = 'userSearch';
    }, 100);
  }

  onSearchUserBlur() {
    setTimeout(() => {
      this.sidenavMode = 'groupList';
    }, 100);
  }

  onUserSearchInput($event: any) {
    const searchQuery = ($event.target as HTMLInputElement).value;
    this.userSearchSubject.next(searchQuery?.trim());
  }

  onSearchUserClicked(user: any) {
    this.userSearchInput.nativeElement.value = '';

    const newGroupmembers = this.removeDuplicates([user, this.dbUser], 'id');
    const newGroupMembersUid = newGroupmembers.map(member => member.data().uid);
    if (newGroupmembers.length < 2) return;
  
    const existingGroupsWithMembers = this.chatGroups.filter(group => {
      const groupMembers: any[] = group.data().members;
      if (newGroupMembersUid.length != groupMembers.length) return false;
      return groupMembers.every(groupMember => newGroupMembersUid.includes(groupMember.uid));
    });

    if (existingGroupsWithMembers.length) {
      this.displayedChatGroup = existingGroupsWithMembers[0];
      return;
    }

    this.chatService.createChatGroupForUser(newGroupmembers).then(() => {
      this.fetchUser();
    });
  }

  sendMessage(messageInput: HTMLInputElement) {
    const chatMessage = {
      message: messageInput.value,
      userId: this.userData.uid,
      userName: this.userData.displayName,
      timestamp: Date.now()
    };

    this.chatService.sendChatMessageToGroup(this.displayedChatGroup.id, chatMessage);
    messageInput.value = '';
  }

  onGroupClicked(group: any) {
    this.displayedChatGroup = group;
  }

  getTitle(snapshot: QueryDocumentSnapshot<DocumentData>) {
    return (snapshot.data()['members'] as any[]).find(member => member.uid != this.userData.uid).displayName;
  }

  private removeDuplicates(myArr: any[], prop: string) {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos
    })
  }

  private fetchUser() {
    this.userService.getCurrentUser().then(user => {
      if (!user) throw new Error('User does not exist');
      this.dbUser = user;
      this.userData = user.data();
      if (this.userData.chatGroupIds?.length) {
        this.chatService.getChatGroupsForUser(this.userData).then((response: DocumentSnapshot<DocumentData>[]) => {
          if (!response.length) {
            return;
          }
          this.chatGroups = response;
          this.displayedChatGroup = this.chatGroups[0];
          this.listenForChatUpdates()
        });
      }
    })
  }

  private listenForChatUpdates() {
    this.chatUnsubscriptions = this.chatService.getChatMessageUpdates(
      this.chatGroups,
      ((snapshot: DocumentSnapshot<DocumentData>) => {
        const newChatGroup = this.chatGroups.filter(group => group.id != snapshot.id);
        newChatGroup.unshift(snapshot);
        this.chatGroups = newChatGroup;
        this.displayedChatGroup = this.chatGroups.find(group => group.id === this.displayedChatGroup.id);
      }));
  }
}
