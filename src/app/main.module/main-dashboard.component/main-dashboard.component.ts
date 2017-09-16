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
import { BotListItemVM } from 'app/shared.module/models/bots-vm';
import { DataSource } from "@angular/cdk/collections";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { FieldMaps, ChartConfig, amChart } from 'app/shared.module/models/chart-vm';
import { ChartConfigs } from 'app/main.module/main-dashboard.component/chartConfig';


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
  public stockChart: amChart;

  public threeM: any;
  public sixM: any;
  public oneY: any;
  public twoY: any;

  public stockDetails: StockDetailsViewModel;

  public exchanges = new Array<ExchangeListItem>();
  public filteredExchanges = new Array<ExchangeListItem>();
  public selectedExchange = new ExchangeListItem();
  public chartData1 = [];
  public chartData2 = [];
  public chartData3 = [];
  public chartData4 = [];
  public securities = new Array<SecuritiesListItem>();
  public filteredSecurities = new Array<SecuritiesListItem>();
  public selectedSecurity = new SecuritiesListItem();
  public companyDetails = new Company();
  public companyPriceData = new Array<PriceListItem>();
  botsDisplayedColumns: string[];
  botsDataSource: BotListDataSource;
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
    // this.getExchanges(true);
    this.botsDisplayedColumns = ["name", "author", "modelInputs", "run-simulation"];
    this.botsDataSource = new BotListDataSource(this._mainService);

    this.generateChartData();
    this.setupChart(ChartConfigs.StockChart);

  }
  public getExchanges(forceRefresh?: boolean) {
    this.isListBusy = true;
    this._intrinioService
      .getExchanges(forceRefresh)
      .subscribe(exchanges => {
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
        this.securities = securities;
        this.filteredSecurities = securities;
        this.isListBusy = false;
      }, err => {
        this._snackBar.open('error', err, 'OK');
        this.isListBusy = false;
      });
  }

  public getCompany(forceRefresh?: boolean) {
    this.getPriceData();
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
          // this.stockChart = AmCharts.makeChart('stockChart', {
          //   'type': 'serial',
          //   'theme': 'dark',
          //   'dataSets': [{}],
          //   'addClassNames': true,
          //   'dataDateFormat': 'YYYY-MM-DD',
          //   'valueAxes': [{
          //     'position': 'left'
          //   }],
          //   'graphs': [{
          //     'id': 'g1',
          //     'balloonText': 'Open:<b>[[open]]</b><br>Low:<b>[[low]]</b><br>High:<b>[[high]]</b><br>Close:<b>[[close]]</b><br>',
          //     'closeField': 'close',
          //     'fillColors': '#42A948',
          //     'highField': 'high',
          //     'lineColor': '#42A948',
          //     'lineAlpha': 1,
          //     'lowField': 'low',
          //     'fillAlphas': 0.2,
          //     'negativeFillColors': '#a94442',
          //     'negativeLineColor': '#a94442',
          //     'openField': 'open',
          //     'title': 'Price:',
          //     'type': 'candlestick',
          //     'valueField': 'close'
          //   }],
          //   'chartScrollbar': {
          //     'enabled': true,
          //     'graphType': 'line'
          //   },
          //   'chartCursor': {
          //     'valueLineEnabled': true,
          //     'valueLineBalloonEnabled': true
          //   },
          //   'categoryField': 'date',
          //   'categoryAxis': {
          //     'parseDates': true
          //   },
          //   'dataProvider': this.companyPriceData,
          //   'export': {
          //     'enabled': true,
          //     'position': 'bottom-right'
          //   }
          // });



          this.isChartBusy = false;
        }, 1000);
      }, err => {
        this._snackBar.open('error', err, 'OK');
        this.isChartBusy = false;
      });
  }

  setupChart(config: ChartConfig) {
    this.stockChart = AmCharts.makeChart("stockChart", config);
    this.stockChart.dataSets.push({
      title: "Data Set ONE",
      fieldMappings: FieldMaps.candleFieldMap,
      dataProvider: this.chartData1,
      categoryField: "date",
      compared: false
    });
    this.stockChart.dataSets.push({
      title: "Data Set TWO",
      fieldMappings: FieldMaps.candleFieldMap,
      dataProvider: this.chartData2,
      categoryField: "date",
      compared: true
    });
  }

  generateChartData() {
    var firstDate = new Date();
    firstDate.setDate(firstDate.getDate() - 500);
    firstDate.setHours(0, 0, 0, 0);

    var a1 = 1500;
    var b1 = 1500;

    var a2 = 1700;
    var b2 = 1700;
    var c2 = 1700;
    var d2 = 1700;
    var e2 = 1700;

    var a3 = 1600;
    var b3 = 1600;
    var a4 = 1400;
    var b4 = 1400;

    for (var i = 0; i < 500; i++) {
      var newDate = new Date(firstDate);
      newDate.setDate(newDate.getDate() + i);

      a1 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 3);
      b1 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);

      a2 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      b2 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);

      a3 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      b3 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);

      a4 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      b4 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);

      this.chartData1.push({
        "date": newDate,
        "open":  a1 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 3),
        "high":  a1 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 3),
        "low":  a1 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 3),
        "close":  a1 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 3),
        "volume": Math.abs(b1 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 15))
      });
      this.chartData2.push({
        "date": newDate,
        "open":  a2 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 3),
        "high":  a2 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 3),
        "low":  a2 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 3),
        "close":  a2 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 3),
        "volume": Math.abs(b2 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 15))
      });
      this.chartData3.push({
        "date": newDate,
        "value": a3,
        "volume": b3 + 1500
      });
      this.chartData4.push({
        "date": newDate,
        "value": a4,
        "volume": b4 + 1500
      });
    }
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

  public runSimulation(bot: BotListItemVM) {
    this.isChartBusy = true;
    this._mainService.simulateBot(bot.id)
      .subscribe(k => {
        console.log(k);
        this.isChartBusy = false;
      }, err => {
        this._snackBar.open('error', err, 'OK');
        this.isChartBusy = false;
      });
  }

}

export class BotListDataSource extends DataSource<any> {
  constructor(private _mainService: MainService) { super(); }

  connect(): Observable<BotListItemVM[]> {
    return this._mainService.getBots();
  }

  disconnect() { }
}
