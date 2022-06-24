import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { getAuth, signOut } from 'firebase/auth';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  @Input() user: any;
  
  constructor() { }

  ngOnInit(): void {
    console.log(this.user)
  }

  onSignout() {
    signOut(getAuth());
  }
}
