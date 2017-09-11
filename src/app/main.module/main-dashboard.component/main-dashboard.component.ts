import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {
  StockSummaryViewModel,
  StockDataViewModel,
  StockDetailsViewModel
} from '../../shared.module/models/stock-vm';
import {
  Company,
  CompanyListItem,
  PriceListItem,
  Frequency,
  ExchangeListItem,
  SecuritiesListItem
} from '../../shared.module/models/intrinio-vm';

import { SnackBarService } from '../../core.module/services/snackbar.service';
import { MainService } from '../main.service';
import { IntrinioService } from '../intrinio.service';
import { FormControl, NgControl, NgModel } from '@angular/forms';
declare var moment: any;
declare var AmCharts: any;

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {
  @ViewChild('securityInput') securityInput: NgModel;
  @ViewChild('exchangeInput') exchangeInput: NgModel;
  public startDate: Date = new Date();
  public endDate: Date = new Date();

  public selectedFrequency: Frequency;
  public Frequency: any = Frequency;
  public stockData = new Array<StockDataViewModel>();
  private _doneTypingInterval = 1000;
  public stockChart: any;

  public threeM: any;
  public sixM: any;
  public oneY: any;
  public twoY: any;

  public stockDetails: StockDetailsViewModel;

  public exchanges = new Array<ExchangeListItem>();
  public filteredExchanges = new Array<ExchangeListItem>();
  public selectedExchange = new ExchangeListItem();

  public securities = new Array<SecuritiesListItem>();
  public filteredSecurities = new Array<SecuritiesListItem>();
  public selectedSecurity = new SecuritiesListItem();
  public companyDetails = new Company();
  public companyPriceData = new Array<PriceListItem>();

  isExchangeSearchBusy = false;
  isSecuritySearchBusy = false;
  public isListBusy = false;
  public isSummaryBusy = false;
  public isChartBusy = false;

  constructor(
    private _mainService: MainService,
    private _intrinioService: IntrinioService,
    private _snackBar: SnackBarService
  ) {
    this.startDate.setDate(this.endDate.getDate() - 180);
    this.selectedFrequency = this.Frequency.daily;
  }

  ngOnInit() {
    this.getExchanges(true);
    this.exchangeInput.valueChanges
      .subscribe((val: string) => {
        this.updateExchangeAutocomplete(val);
      });
    this.securityInput.valueChanges.debounceTime(500)
      .subscribe((val: string) => {
        if (val.length > 1) {
          this.isSecuritySearchBusy = true;
          this._intrinioService.querySecurity(this.selectedExchange, val)
            .subscribe(results => {
              this.isSecuritySearchBusy = false;
              return this.filteredSecurities = results;
            }, err => {
              this._snackBar.open('error', 'Error');
              this.isSecuritySearchBusy = false;
            });
        }
      });
  }

  public getExchanges(forceRefresh?: boolean) {
    this.isListBusy = true;
    this._intrinioService
      .getExchanges(forceRefresh)
      .subscribe(exchanges => {
        setTimeout(() => {
          this.exchanges = exchanges
            .sort((a: ExchangeListItem, b: ExchangeListItem) => {
              if (a.acronym > b.acronym) {
                return 1;
              } else if (a.acronym < b.acronym) {
                return -1;
              }
            });
          this.filteredExchanges = this.exchanges;
          this.isListBusy = false;
        }, 500);
      }, err => {
        this._snackBar.open('error', err, 'OK');
        this.isListBusy = false;
      });
  }

  public getSecurities(forceRefresh?: boolean) {
    this.isListBusy = true;
    this._intrinioService
      .getSecurities(this.selectedExchange, '500', forceRefresh)
      .subscribe(securities => {
        setTimeout(() => {
          this.securities = securities;
          this.filteredSecurities = securities;
          this.isListBusy = false;
        }, 500);
      }, err => {
        this._snackBar.open('error', err, 'OK');
        this.isListBusy = false;
      });
  }

  public getCompany(forceRefresh?: boolean) {
    this.getStock();
    this.isSummaryBusy = true;
    this._intrinioService.getCompanyDetails(this.selectedSecurity.ticker)
      .subscribe(k => {
        setTimeout(() => {
          this.companyDetails = k;
          this.isSummaryBusy = false;
        }, 1000);
      }, err => {
        this._snackBar.open('error', err, 'OK');
        this.isSummaryBusy = false;
      });
  }

  public getPriceData(forceRefresh?: boolean) {
    this.isChartBusy = true;
    this._intrinioService
      .getHistoricalPriceData(this.selectedSecurity.ticker, this.startDate.toISOString().slice(0, 10), this.endDate.toISOString().slice(0, 10), this.selectedFrequency, forceRefresh)
      .subscribe(k => {
        setTimeout(() => {
          this.companyPriceData = k.sort((a: PriceListItem, b: PriceListItem) => {
            if (a.date < b.date) {
              return -1;
            } else if (b.date < a.date) {
              return 1;
            } else {
              return 0;
            }
          });
          this.stockChart = AmCharts.makeChart('stockChart', {
            'type': 'serial',
            'theme': 'dark',
            'addClassNames': true,
            'dataDateFormat': 'YYYY-MM-DD',
            'valueAxes': [{
              'position': 'left'
            }],
            'graphs': [{
              'id': 'g1',
              'balloonText': 'Open:<b>[[open]]</b><br>Low:<b>[[low]]</b><br>High:<b>[[high]]</b><br>Close:<b>[[close]]</b><br>',
              'closeField': 'close',
              'fillColors': '#42A948',
              'highField': 'high',
              'lineColor': '#42A948',
              'lineAlpha': 1,
              'lowField': 'low',
              'fillAlphas': 0.9,
              'negativeFillColors': '#a94442',
              'negativeLineColor': '#a94442',
              'openField': 'open',
              'title': 'Price:',
              'type': 'candlestick',
              'valueField': 'close'
            }],
            'chartScrollbar': {
              'enabled': true,
              'graphType': 'line'
            },
            'chartCursor': {
              'valueLineEnabled': true,
              'valueLineBalloonEnabled': true
            },
            'categoryField': 'date',
            'categoryAxis': {
              'parseDates': true
            },
            'dataProvider': this.companyPriceData,
            'export': {
              'enabled': true,
              'position': 'bottom-right'
            }
          });
          this.isChartBusy = false;
        }, 1000);
      }, err => {
        this._snackBar.open('error', err, 'OK');
        this.isChartBusy = false;
      });
  }

  public getStock() {
    this.stockDetails = new StockDetailsViewModel(
      this.selectedSecurity.ticker,
      this.selectedSecurity.security_name,
      '',
      '$98.72',
      '+ 0.57%',
      '+ $0.56',
      '$467M',
      '$96.54 - $106.12'
    );
    this.threeM = AmCharts.makeChart('3m', {
      'type': 'serial', 'theme': 'dark',
      'dataProvider': [
        { 'day': 1, 'value': 0 },
        { 'day': 2, 'value': 3 },
        { 'day': 3, 'value': 5 },
        { 'day': 4, 'value': 8 },
        { 'day': 5, 'value': 8 },
        { 'day': 6, 'value': 18 },
        { 'day': 7, 'value': 19 },
        { 'day': 8, 'value': 20 },
        { 'day': 9, 'value': 20 },
        { 'day': 10, 'value': 25 }
      ],
      'categoryField': 'day',
      'autoMargins': false,
      'marginLeft': 0,
      'marginRight': 0,
      'marginTop': 0,
      'marginBottom': 0,
      'graphs': [{
        'valueField': 'value',
        'bulletField': 'bullet',
        'showBalloon': false,
        'lineColor': '#ffffff',
        'lineThickness': 2
      }],
      'valueAxes': [{
        'gridAlpha': 0,
        'axisAlpha': 0
      }],
      'categoryAxis': {
        'gridAlpha': 0,
        'axisAlpha': 0,
        'startOnAxis': true
      }
    });
    this.sixM = AmCharts.makeChart('6m', {
      'type': 'serial', 'theme': 'dark',
      'dataProvider': [
        { 'day': 1, 'value': 14 },
        { 'day': 2, 'value': 13 },
        { 'day': 3, 'value': 14 },
        { 'day': 4, 'value': 14 },
        { 'day': 5, 'value': 21 },
        { 'day': 6, 'value': 18 },
        { 'day': 7, 'value': 7 },
        { 'day': 8, 'value': 21 },
        { 'day': 9, 'value': 28 },
        { 'day': 10, 'value': 32 }
      ],
      'categoryField': 'day',
      'autoMargins': false,
      'marginLeft': 0,
      'marginRight': 0,
      'marginTop': 0,
      'marginBottom': 0,
      'graphs': [{
        'valueField': 'value',
        'bulletField': 'bullet',
        'showBalloon': false,
        'lineColor': '#ffffff',
        'lineThickness': 2
      }],
      'valueAxes': [{
        'gridAlpha': 0,
        'axisAlpha': 0
      }],
      'categoryAxis': {
        'gridAlpha': 0,
        'axisAlpha': 0,
        'startOnAxis': true
      }
    });
    this.oneY = AmCharts.makeChart('1y', {
      'type': 'serial', 'theme': 'dark',
      'dataProvider': [
        { 'day': 1, 'value': 18 },
        { 'day': 2, 'value': 4 },
        { 'day': 3, 'value': 29 },
        { 'day': 4, 'value': 8 },
        { 'day': 5, 'value': 6 },
        { 'day': 6, 'value': 6 },
        { 'day': 7, 'value': 2 },
        { 'day': 8, 'value': 4 },
        { 'day': 9, 'value': 8 },
        { 'day': 10, 'value': 12 }
      ],
      'categoryField': 'day',
      'autoMargins': false,
      'marginLeft': 0,
      'marginRight': 0,
      'marginTop': 0,
      'marginBottom': 0,
      'graphs': [{
        'valueField': 'value',
        'bulletField': 'bullet',
        'showBalloon': false,
        'lineColor': '#ffffff',
        'lineThickness': 2
      }],
      'valueAxes': [{
        'gridAlpha': 0,
        'axisAlpha': 0
      }],
      'categoryAxis': {
        'gridAlpha': 0,
        'axisAlpha': 0,
        'startOnAxis': true
      }
    });
    this.twoY = AmCharts.makeChart('2y', {
      'type': 'serial', 'theme': 'dark',
      'dataProvider': [
        { 'day': 1, 'value': 0 },
        { 'day': 2, 'value': 3 },
        { 'day': 3, 'value': 12 },
        { 'day': 4, 'value': 19 },
        { 'day': 5, 'value': 44 },
        { 'day': 6, 'value': 2 },
        { 'day': 7, 'value': 24 },
        { 'day': 8, 'value': 9 },
        { 'day': 9, 'value': 6 },
        { 'day': 10, 'value': 4 }
      ],
      'categoryField': 'day',
      'autoMargins': false,
      'marginLeft': 0,
      'marginRight': 0,
      'marginTop': 0,
      'marginBottom': 0,
      'graphs': [{
        'valueField': 'value',
        'bulletField': 'bullet',
        'showBalloon': false,
        'lineColor': '#ffffff',
        'lineThickness': 2
      }],
      'valueAxes': [{
        'gridAlpha': 0,
        'axisAlpha': 0
      }],
      'categoryAxis': {
        'gridAlpha': 0,
        'axisAlpha': 0,
        'startOnAxis': true
      }
    });
  }

  public getData() {
    this.getPriceData();
    // this._mainService
    //   .getStockData()
    //   .then(data => {
    //     this.stockData = data;
    //   });
  }
  public updateExchangeAutocomplete(val: any) {
    if (typeof val === 'string') {
      this.filteredExchanges = val ? this.exchanges.filter(item => {
        if (item.symbol && item.symbol.toLocaleLowerCase().indexOf(val.toLocaleLowerCase()) > -1) {
          return true;
        }
        if (item.institution_name && item.institution_name.toLocaleLowerCase().indexOf(val.toLocaleLowerCase()) > -1) {
          return true;
        }
        return false;
      }) : this.exchanges;
    } else {
      this.filteredExchanges = this.exchanges;
    }

  }

  public exchangeDisplayFn(item: ExchangeListItem): string {
    return item ? (item.institution_name ? item.institution_name : '') : '';
  }
  public securityDisplayFn(item: SecuritiesListItem): string {
    return item ? (item.security_name ? item.security_name : '') : '';
  }
  public onExchangeBlur() {
    if (!this.selectedExchange) {
      this.selectedExchange = new ExchangeListItem();
    } else {
      if (!this.selectedExchange.institution_name) {
        this.selectedExchange = new ExchangeListItem();
      }
    }
  }
  public onSecurityBlur() {
    if (!this.selectedSecurity) {
      this.selectedSecurity = new SecuritiesListItem();
    } else {
      if (!this.selectedSecurity.security_name) {
        this.selectedSecurity = new SecuritiesListItem();
      }
    }
  }

}
