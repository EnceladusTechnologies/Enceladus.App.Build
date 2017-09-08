import { Component } from '@angular/core';
import { LoginService } from '../../login.module/login.service';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

  constructor(
    private _loginService: LoginService
  ) {
    console.log('main page constructor');
  }

  public logout() {
    this._loginService.logout();
  }
}
