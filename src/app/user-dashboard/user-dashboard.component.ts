import { Component, Input} from '@angular/core';
import { getAuth, signOut } from 'firebase/auth';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent {

  @Input() user: any;

  onSignout() {
    signOut(getAuth());
  }
}
