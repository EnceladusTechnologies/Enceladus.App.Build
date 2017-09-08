import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LoginViewModel, LoginResponseVM } from '../../shared.module/models/login-vm';
import { AuthHttpService } from './auth-http.service';
import { BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class AccountService {
    private baseUrl: string;
    constructor(
        private _authHttp: AuthHttpService) {
        this.baseUrl = `accounts`;
    }

    public login(vm: LoginViewModel): Observable<LoginResponseVM> {
        return this._authHttp.post(`${this.baseUrl}/login`, vm)
            .map((resp: Response) => <LoginResponseVM>resp.json())
            .catch(this._authHttp.handleError);
    }
}

