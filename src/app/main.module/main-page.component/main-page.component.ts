import { Component } from '@angular/core';
import { AuthService } from "app/auth.service";
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

  constructor(
    private auth: AuthService
  ) {
  }

  public logout() {
    this.auth.logout();
  }
}
