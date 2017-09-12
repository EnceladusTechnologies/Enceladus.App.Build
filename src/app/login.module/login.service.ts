import { Injectable } from '@angular/core';
import { AuthHttpService } from '../core.module/services/auth-http.service';
import { Router } from '@angular/router';
import { cacheKeys } from '../app.constants';
// import { AUTH_CONFIG } from '../auth0-variables';
// import * as auth0 from 'auth0-js';

@Injectable()
export class LoginService {

    // auth0 = new auth0.WebAuth({
    //     clientID: AUTH_CONFIG.CLIENT_ID,
    //     domain: AUTH_CONFIG.CLIENT_DOMAIN,
    //     responseType: 'token id_token',
    //     audience: AUTH_CONFIG.AUDIENCE,
    //     redirectUri: AUTH_CONFIG.REDIRECT,
    //     scope: AUTH_CONFIG.SCOPE
    // });

    constructor(private _router: Router,
        private _authHttpService: AuthHttpService) {
    }

    public login() {
        // Auth0 authorize request
        // this.auth0.authorize({
        //     responseType: 'token id_token',
        //     redirectUri: AUTH_CONFIG.REDIRECT,
        //     audience: AUTH_CONFIG.AUDIENCE,
        //     scope: AUTH_CONFIG.SCOPE
        // });
    }

    public handleAuthentication() {
        // When Auth0 hash parsed, get profile
        // this.auth0.parseHash((err, authResult) => {
        //     if (authResult && authResult.accessToken) {
        //         this._setSession(authResult);
        //         window.location.hash = '';
        //         if (this._router.url !== '/dashboard') {
        //             console.log('handleAuthentication navigate to /dashboard');
        //             this._router.navigate(['/dashboard']);
        //         }
        //     } else if (err) {
        //         console.log('handleAuthentication navigate to /');
        //         this._router.navigate(['/dashboard']);
        //         console.error(`Error: ${err.error}`);
        //     }
        // });
    }
    private _setSession(authResult: any) {
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
        this._authHttpService.setAuthHeader();
    }

    public isAuthenticated(): boolean {
        // Check whether the current time is past the
        // access token's expiry time
        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

    public logout() {
        localStorage.clear();
        this.login();
    };
}


