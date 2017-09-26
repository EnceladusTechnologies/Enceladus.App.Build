import { Injectable } from '@angular/core';
import { AuthHttpService } from '../../core.module/services/auth-http.service';
import { ConfigurationService } from '../../core.module/services/configuration.service';
import { CacheService } from 'ng2-cache/ng2-cache';
import { Observable } from 'rxjs/Observable';
import { TradingModelListItemVM } from '../../shared.module/models/bots-vm';
import { cacheKeys } from '../../app.constants';

@Injectable()
export class ModelService {

  private baseUrl: string;

  constructor(private _authHttp: AuthHttpService,
    private _config: ConfigurationService,
    private _cacheService: CacheService) {
    this.baseUrl = `models`;
  }
  public getModels(forceRefresh?: boolean): Observable<TradingModelListItemVM[]> {
    const cacheKey = cacheKeys.models;
    if (!forceRefresh && this._cacheService.exists(cacheKey)) {
      return Observable.of(this._cacheService.get(cacheKey));
    } else {
      return this._authHttp.get(`models`)
        .map((resp: any) => {
          this._cacheService.set(cacheKey, <TradingModelListItemVM[]>resp.json(), { maxAge: this._config.maxAge });
          return resp.json();
        })
        .catch(this._authHttp.handleError);
    }
  }
}
