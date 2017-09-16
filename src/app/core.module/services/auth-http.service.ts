import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs } from '@angular/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { cacheKeys } from '../../app.constants';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthHttpService {
    private _headers: Headers;
    private _baseUrl: string;

    constructor(
        private _http: Http,
        private _router: Router) {
        this._headers = new Headers();
        this._headers.append('Content-Type', 'application/json');
        this._headers.append('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
        this._baseUrl = `${environment.apiServer}`;

    }
    public get(path: string) {
        const opts: RequestOptionsArgs = {
            body: '',
            headers: this._headers
        };
        return this._http.get(this._baseUrl + path, opts);
    }
    public put(path: string, object: any) {
        return this._http.put(this._baseUrl + path, JSON.stringify(object), { headers: this._headers });
    }
    public delete(path: string) {
        const opts: RequestOptionsArgs = {
            body: '',
            headers: this._headers
        };
        return this._http.delete(this._baseUrl + path, opts);
    }
    public post(path: string, object: any) {
        return this._http.post(this._baseUrl + path, JSON.stringify(object), { headers: this._headers });
    }

    public setAuthHeader(token?: string): Headers {
        if (token) {
            this._headers.set('Authorization', 'Bearer ' + token);
        } else {
            this._headers.set('Authorization', 'Bearer ' + localStorage.getItem(cacheKeys.access_token));
        }
        return this._headers;
    }
    public handleError(error: any) {
        let errMsg = '';
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        // debugger;
        if (error && error.status === 0) {
            errMsg = 'We are having trouble communicating with the server.  Please wait a few seconds then try again.';
        } else if (error && error.status === 401) {
            if (this._router) {
                this._router.navigate(['/login']);
            } else {
                console.log('else');
            }

        } else {
            if (error.message) {
                errMsg = error.message;
            } else {
                errMsg = (typeof error.text === 'function') ? JSON.parse(error.text()).text :
                    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
            }

            console.error(errMsg); // log to console instead
        }
        return Observable.throw(errMsg);
    }
}
