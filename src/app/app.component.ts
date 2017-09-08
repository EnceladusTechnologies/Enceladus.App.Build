import { Component } from '@angular/core';
import { Router, Event, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { SnackBarService } from './core.module/services/snackbar.service';
import { LoginService } from './login.module/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public pageTitle = '';
  public loadingRoute = false;
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _titleService: Title,
    private _loginService: LoginService,
    private _snackBar: SnackBarService) {
    this._loginService.handleAuthentication();
    this._router.events.subscribe(
      (event: Event) => {
        this.loadingRoute = true;
        if (event instanceof NavigationEnd) {
          this.loadingRoute = false;
          let currentRoute = this._activatedRoute.root;
          while (currentRoute.children[0] !== undefined) {
            currentRoute = currentRoute.children[0];
          }
          const data = currentRoute.snapshot.data;
          this.pageTitle = JSON.parse(JSON.stringify(data)).title;
          this._titleService.setTitle(this.pageTitle);
        }
      });
  }

}
