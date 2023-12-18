import { Component, inject } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [{ title: 'Home', url: '/pages/home', icon: 'home' }];

  constructor() {}
}
