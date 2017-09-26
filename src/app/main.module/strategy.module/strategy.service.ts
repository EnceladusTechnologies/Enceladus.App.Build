import { Injectable } from '@angular/core';
import { AuthHttpService } from '../../core.module/services/auth-http.service';
import { ConfigurationService } from '../../core.module/services/configuration.service';
import { CacheService } from 'ng2-cache/ng2-cache';
import { Observable } from 'rxjs/Observable';
import { BotListItemVM, BotStrategyVm, TradingModelListItemVM } from '../../shared.module/models/bots-vm';
import { cacheKeys } from 'app/app.constants';
import { QuestionBase } from 'app/main.module/strategy.module/model-config-question/question-types';

@Injectable()
export class StrategyService {

    private baseUrl: string;

    constructor(private _authHttp: AuthHttpService,
        private _config: ConfigurationService,
        private _cacheService: CacheService) {
        this.baseUrl = `bots`;
    }

    public getBotStrategies(forceRefresh?: boolean): Observable<BotListItemVM[]> {
        const cacheKey = cacheKeys.bots;
        if (!forceRefresh && this._cacheService.exists(cacheKey)) {
            return Observable.of(this._cacheService.get(cacheKey));
        } else {
            return this._authHttp.get(`bots`)
                .map((resp: any) => {
                    this._cacheService.set(cacheKey, <BotListItemVM[]>resp.json(), { maxAge: this._config.maxAge });
                    return resp.json();
                })
                .catch(this._authHttp.handleError);
        }
    }

    public getBotStrategy(id: string, forceRefresh?: boolean): Observable<BotStrategyVm> {

        return this._authHttp.get(`bots/${id}`)
            .map((resp: any) => {
                return resp.json();
            })
            .catch(this._authHttp.handleError);

    }

    public getModels(forceRefresh?: boolean): Observable<TradingModelListItemVM[]> {
        return this._authHttp.get(`models`)
            .map((resp: any) => {
                return resp.json();
            })
            .catch(this._authHttp.handleError);

    }
    public getModelConfigs(modelId: string): Observable<QuestionBase<any>[]> {
        return this._authHttp.get(`models/${modelId}/configs`)
            .map((resp: any) => {
                return resp.json();
            })
            .catch(this._authHttp.handleError);
    }
}
