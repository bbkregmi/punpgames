import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  @Input() user: any;

  @Output() signout = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  onSignout() {
    this.signout.emit();
  }
}
