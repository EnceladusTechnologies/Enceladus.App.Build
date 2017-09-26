import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthService } from '../../auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(
        private auth: AuthService,
        private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.auth.isAuthenticated()) {
            if (state.url === '/') {
                return false;
            }
            return true;
        } else {
            this.auth.login();
            return false;
        }
    }

}
