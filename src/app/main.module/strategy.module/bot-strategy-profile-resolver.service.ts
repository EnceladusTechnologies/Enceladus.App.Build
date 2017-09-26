import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { StrategyService } from './strategy.service';
import { BotStrategyVm } from '../../shared.module/models/bots-vm';

@Injectable()
export class BotStrategyProfileResolver implements Resolve<BotStrategyVm> {
    constructor(private ss: StrategyService, private router: Router, private route: ActivatedRoute) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BotStrategyVm> {
        const id = route.paramMap.get('id');

        return this.ss.getBotStrategy(id).take(1).map(item => {
            if (item) {
                return item;
            } else { // id not found
                this.router.navigate(['/bot-strategy-page/list'], { relativeTo: this.route });
                return null;
            }
        });
    }
}
