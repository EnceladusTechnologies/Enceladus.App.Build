import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';


@Injectable()
export class BotStrategyGuardService implements CanActivate {

    constructor() { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return true;
    }

}
