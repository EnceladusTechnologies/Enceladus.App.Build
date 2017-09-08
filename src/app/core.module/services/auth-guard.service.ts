import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { LoginService } from '../../login.module/login.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(
        private _loginService: LoginService,
        private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this._loginService.isAuthenticated()) {
            if (state.url === '/' || state.url === 'login-page') {
                console.log('authGuard navigate to login-page 1');
                this.router.navigate(['login-page']);
                return false;
            }
            return true;
        } else {
            console.log('authGuard navigate to login-page 2');
            this.router.navigate(['login-page']);
            return false;
        }
    }

}
