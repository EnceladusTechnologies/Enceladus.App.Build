import { Component, OnInit, ElementRef } from '@angular/core';
import {
  StockSummaryViewModel,
  StockDataViewModel,
  StockDetailsViewModel
} from '../../shared.module/models/stock-vm';
import {
  Company,
  CompanyListItem,
  PriceListItem
} from '../../shared.module/models/intrinio-vm';

import { SnackBarService } from '../../core.module/services/snackbar.service';
import { MainService } from '../main.service';
import { IntrinioService } from '../intrinio.service';
declare var moment: any;
declare var AmCharts: any;

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {

  public startDate: Date;
  public endDate: Date;

  public stockData = new Array<StockDataViewModel>();

  public stockChart: any;

  public threeM: any;
  public sixM: any;
  public oneY: any;
  public twoY: any;

  public stockDetails: StockDetailsViewModel;

  public companies = new Array<CompanyListItem>();
  public filteredCompanies = new Array<CompanyListItem>();
  public selectedCompany = new CompanyListItem();
  public companyDetails = new Company();
  public companyPriceData = new Array<PriceListItem>();


  public isListBusy = false;
  public isSummaryBusy = false;
  public isChartBusy = false;

  constructor(
    private _mainService: MainService,
    private _intrinioService: IntrinioService,
    private _snackBar: SnackBarService
  ) {
    console.log('main dashboard constructor');

  }

  ngOnInit() {
    this.getCompanies();
  }


  public getCompanies(forceRefresh?: boolean) {
    this.isListBusy = true;
    this._intrinioService
      .getCompanies('500', forceRefresh)
      .subscribe(companies => {
        setTimeout(() => {
          this.companies = companies;
          this.filteredCompanies = companies;
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
    this._intrinioService.getCompanyDetails(this.selectedCompany.ticker)
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
      .getHistoricalPriceData(this.selectedCompany.ticker, this.startDate.toISOString().slice(0, 10), this.endDate.toISOString().slice(0, 10), forceRefresh)
      .subscribe(k => {
        setTimeout(() => {
          this.companyPriceData = k.sort((a: PriceListItem,
            b: PriceListItem) => {
            if (a.date < b.date) {
              return -1;
            } else if (b.date < a.date) {
              return 1;
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
      this.selectedCompany.ticker,
      this.selectedCompany.name,
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

  public getData(evt: any) {
    this.getPriceData();
    this._mainService
      .getStockData()
      .then(data => {
        this.stockData = data;
      });
  }

  public updateAutocomplete(val: any) {
    if (typeof val === 'string') {
      this.filteredCompanies = val ? this.companies.filter(item => {
        if (item.name && item.name.toLocaleLowerCase().indexOf(val.toLocaleLowerCase()) > -1) {
          return true;
        }
        if (item.ticker && item.ticker.toLocaleLowerCase().indexOf(val.toLocaleLowerCase()) > -1) {
          return true;
        }
        return false;
      }) : this.companies;
    } else {
      this.filteredCompanies = this.companies;
    }

  }
  public displayFn(item: any): string {
    return item ? (item.name ? item.name : '') : '';
  }
  public onBlur() {
    if (!this.selectedCompany) {
      this.selectedCompany = new CompanyListItem();
    } else {
      if (!this.selectedCompany.name) {
        this.selectedCompany = new CompanyListItem();
      }
    }
  }

}
