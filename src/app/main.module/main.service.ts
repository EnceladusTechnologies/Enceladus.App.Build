import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import {
    StockSummaryViewModel,
    StockDataViewModel,
    StockDetailsViewModel
} from '../shared.module/models/stock-vm';

@Injectable()
export class MainService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private heroesUrl = 'api';  // URL to web api

    constructor(private http: Http) { }

    getStockSummaries(): Promise<StockSummaryViewModel[]> {
        return this.http.get(this.heroesUrl + '/STOCKS')
            .toPromise()
            .then(response => response.json().data as StockSummaryViewModel[])
            .catch(this.handleError);
    }

    getStockData(): Promise<StockDataViewModel[]> {
        return this.http.get(this.heroesUrl + '/STOCKDATA')
            .toPromise()
            .then(response => response.json().data as StockDataViewModel[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
