import { Component } from '@angular/core';
import { AuthService } from "app/auth.service";
import { NavigationEnd, Router, Event, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  pageTitle: string;
  public selectedRoute: string;
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private auth: AuthService,
    private _titleService: Title
  ) {
    this._router.events.subscribe(
      (value: Event) => {
        if (value instanceof NavigationEnd) {
          this.selectedRoute = this._router.url;
          let currentRoute = this._activatedRoute.root;
          const data = currentRoute.snapshot.data;
          this.pageTitle = JSON.parse(JSON.stringify(data)).title;
          this._titleService.setTitle(this.pageTitle);
        }
      });
  }

  public logout() {
    this.auth.logout();
  }
}
