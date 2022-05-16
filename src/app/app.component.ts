import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'trivia';

  constructor(
    private router: Router
  ) {}

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }
}
