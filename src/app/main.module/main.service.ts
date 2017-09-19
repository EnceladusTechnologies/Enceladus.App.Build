import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import {
    StockSummaryViewModel,
    StockDataViewModel,
    StockDetailsViewModel
} from '../shared.module/models/stock-vm';
import { AuthHttpService } from 'app/core.module/services/auth-http.service';
import { ConfigurationService } from 'app/core.module/services/configuration.service';
import { CacheService } from 'ng2-cache/ng2-cache';
import { cacheKeys } from 'app/app.constants';
import { Observable } from 'rxjs';
import { BotListItemVM, TradeBook } from 'app/shared.module/models/bots-vm';

@Injectable()
export class MainService {

    private baseUrl: string;

    constructor(private _authHttp: AuthHttpService,
        private _config: ConfigurationService,
        private _cacheService: CacheService) {
        this.baseUrl = `app`;
    }


    public getBots(forceRefresh?: boolean): Observable<BotListItemVM[]> {
        // let cacheKey = tenantId + cacheKeys.bots;
        // if (!forceRefresh && this._cacheService.exists(cacheKey)) {
        //     return Observable.of(this._cacheService.get(cacheKey));
        // } else {
            return this._authHttp.get(`bots`)
                .map((resp: any) => {
                //    this._cacheService.set(cacheKey, <TagListItemVM[]>resp.json(), { maxAge: this._config.maxAge });
                    return resp.json();
                })
                .catch(this._authHttp.handleError);
        // }
    }
    public simulateBot(botId: string, forceRefresh?: boolean): Observable<TradeBook> {

            return this._authHttp.get(`bots/${botId}/simulate`)
                .map((resp: any) => {
                    return resp.json();
                })
                .catch(this._authHttp.handleError);

    }
}
