import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../login.service';
import { cacheKeys } from '../../app.constants';
import { Observable } from 'rxjs/Rx';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private _router: Router,
    private _loginService: LoginService) {
    if (this._loginService.isAuthenticated()) {
      this._router.navigate(['simulation-page']);
    }
  }

  ngOnInit() {
    if (!this._loginService.isAuthenticated()) {
      this.login();
    }
  }

  public login() {
    this._loginService.login();
  }
}
