import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {
    HttpGetResponse,
    Company,
    CompanyListItem,
    PriceListItem
} from '../shared.module/models/intrinio-vm';
import 'rxjs/add/operator/map';
import { INTRINIO_CONFIG } from '../intrinio-variables';
import { CacheService } from 'ng2-cache/ng2-cache';
import { cacheKeys } from '../app.constants';
import { ConfigurationService } from '../core.module/services/configuration.service';

@Injectable()
export class IntrinioService {
    private _headers: Headers;
    private _baseUrl: string;
    private _opts: RequestOptionsArgs;

    constructor(
        private _http: Http,
        private _config: ConfigurationService,
        private _cacheService: CacheService
    ) {
        this._baseUrl = `https://api.intrinio.com`;
        this._headers = new Headers();
        this._headers.append('Authorization', 'Basic ' +
            new Buffer(INTRINIO_CONFIG.USERNAME + ':' + INTRINIO_CONFIG.PASSWORD).toString('base64'));
        this._opts = {
            body: '',
            headers: this._headers
        };
    }

    public getCompanyDetails(ticker: string, forceRefresh?: boolean): Observable<Company> {
        const cacheKey = ticker + cacheKeys.companyDetails;
        if (!forceRefresh && this._cacheService.exists(cacheKey)) {
            return Observable.of(this._cacheService.get(cacheKey));
        } else {
            return this._http.get(`${this._baseUrl}/companies?ticker=${ticker}`, this._opts)
                .map((resp: any) => {
                    this._cacheService.set(cacheKey, <Company>resp.json(), { maxAge: this._config.maxAge });
                    return <Company>resp.json();
                })
                .catch(this.handleError);
        }
    }

    public getCompanies(numberOfCompanies: string, forceRefresh?: boolean): Observable<CompanyListItem[]> {
        const cacheKey = cacheKeys.companies;
        if (!forceRefresh && this._cacheService.exists(cacheKey)) {
            return Observable.of(this._cacheService.get(cacheKey));
        } else {
            return this._http.get(`${this._baseUrl}/companies?page_size=${numberOfCompanies}`, this._opts)
                .map((resp: any) => {
                    const getResponse = <HttpGetResponse>resp.json();
                    this._cacheService.set(cacheKey, <CompanyListItem[]>getResponse.data, { maxAge: this._config.maxAge });
                    return <CompanyListItem[]>getResponse.data;
                })
                .catch(this.handleError);
        }
    }

    public getHistoricalPriceData(ticker: string, startDate: string, endDate: string, forceRefresh?: boolean): Observable<PriceListItem[]> {
        // const cacheKey = cacheKeys.applePrices;
        // if (!forceRefresh && this._cacheService.exists(cacheKey)) {
        //     return Observable.of(this._cacheService.get(cacheKey));
        // } else {
        /*return this._http.get(`${this._baseUrl}/prices?identifier=${ticker}`, this._opts)
            .map((resp: any) => {
                const getResponse = <HttpGetResponse>resp.json();
                // this._cacheService.set(cacheKey, <PriceListItem[]>getResponse.data, { maxAge: this._config.maxAge });
                return <PriceListItem[]>getResponse.data;
            })
            .catch(this.handleError);
            */

        return this._http.get(`${this._baseUrl}/prices?identifier=${ticker}&start_date=${startDate}&end_date=${endDate}&page_size=5000`, this._opts)
            .map((resp: any) => {
                const getResponse = <HttpGetResponse>resp.json();
                // this._cacheService.set(cacheKey, <PriceListItem[]>getResponse.data, { maxAge: this._config.maxAge });
                return <PriceListItem[]>getResponse.data;
            })
            .catch(this.handleError);

        // }
    }
    public handleError(error: any) {
        let errMsg = '';
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        // debugger;
        if (error && error.status === 0) {
            errMsg = 'We are having trouble communicating with the server.  Please wait a few seconds then try again.';
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
