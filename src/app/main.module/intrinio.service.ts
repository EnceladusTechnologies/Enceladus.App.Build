import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {
    HttpGetResponse,
    Company,
    CompanyListItem,
    PriceListItem,
    Frequency,
    ExchangeListItem,
    SecuritiesListItem
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
    private _FrequencyEnum: any = Frequency;
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
    public queryExchange(value: string): Observable<ExchangeListItem[]> {
        return this._http.get(`${this._baseUrl}/stock_exchanges?query=${value}`, this._opts)
            .map((resp: any) => {
                const getResponse = <HttpGetResponse>resp.json();
                return <ExchangeListItem[]>getResponse.data;
            })
            .catch(this.handleError);
    }
    public querySecurity(exch: ExchangeListItem, value: string): Observable<SecuritiesListItem[]> {
        return this._http.get(`${this._baseUrl}/securities?exch_symbol=${exch.symbol}&query=${value}`, this._opts)
            .map((resp: any) => {
                const getResponse = <HttpGetResponse>resp.json();
                return <SecuritiesListItem[]>getResponse.data;
            })
            .catch(this.handleError);
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

    public getExchanges(forceRefresh?: boolean): Observable<ExchangeListItem[]> {
        // const cacheKey = cacheKeys.exchanges;
        // if (!forceRefresh && this._cacheService.exists(cacheKey)) {
        //     return Observable.of(this._cacheService.get(cacheKey));
        // } else {

        const exch = new Array<ExchangeListItem>();
        const amx = new ExchangeListItem();
        amx.acronym = 'NASDAQ';
        amx.symbol = '^XNAS';
        amx.institution_name = 'NASDAQ';
        amx.mic = 'XNAS';
        exch.push(amx);

        const nyse = new ExchangeListItem();
        nyse.acronym = 'NYSE';
        nyse.symbol = '^XNYS';
        nyse.institution_name = 'New York Stock Exchange, Inc.';
        nyse.mic = 'XNYS';
        exch.push(nyse);

        const bat = new ExchangeListItem();
        bat.acronym = 'BATS';
        bat.mic = 'BATS';
        bat.symbol = '^BATS';
        bat.institution_name = 'Bats Z-Exchange';
        exch.push(bat);

        const otc = new ExchangeListItem();
        otc.acronym = 'OTCBB';
        otc.mic = 'XOTC';
        otc.institution_name = 'OTCBB';
        otc.symbol = '^XOTC';
        exch.push(otc);

        return Observable.of(exch);

        // return this._http.get(`${this._baseUrl}/stock_exchanges`, this._opts)
        //     .map((resp: any) => {
        //         const getResponse = <HttpGetResponse>resp.json();
        //         // this._cacheService.set(cacheKey, <ExchangeListItem[]>getResponse.data, { maxAge: this._config.maxAge });
        //         return <ExchangeListItem[]>getResponse.data;
        //     })
        //     .catch(this.handleError);
        // }
    }

    public getSecurities(exch: ExchangeListItem, numberOfSecurities: string, forceRefresh?: boolean): Observable<SecuritiesListItem[]> {
        // const cacheKey = exch.acronym + cacheKeys.companies;
        // if (!forceRefresh && this._cacheService.exists(cacheKey)) {
        //     return Observable.of(this._cacheService.get(cacheKey));
        // } else {
        return this._http.get(`${this._baseUrl}/securities?exch_symbol=${exch.acronym}`, this._opts)
            .map((resp: any) => {
                const getResponse = <HttpGetResponse>resp.json();
                // this._cacheService.set(cacheKey, <CompanyListItem[]>getResponse.data, { maxAge: this._config.maxAge });
                return <SecuritiesListItem[]>getResponse.data;
            })
            .catch(this.handleError);
        // }
    }

    public getHistoricalPriceData(ticker: string, startDate: string, endDate: string, frequency: Frequency, forceRefresh?: boolean)
        : Observable<PriceListItem[]> {
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
        const freq = this._FrequencyEnum[frequency];
        return this._http
            .get(`${this._baseUrl}/prices?frequency=${freq}&identifier=${ticker}&start_date=${startDate}&end_date=${endDate}&page_size=5000`
            , this._opts)
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
