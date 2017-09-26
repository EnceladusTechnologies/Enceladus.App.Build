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
import { BotListItemVM, BotResultVM } from 'app/shared.module/models/bots-vm';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { FieldMaps, ChartConfig, amChart } from 'app/shared.module/models/chart-vm';
import { ChartConfigs } from '../simulation.module/simulation-dashboard.component/chartConfig';


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
  public currentBot: BotResultVM;
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
    this.botsDisplayedColumns = ['name', 'author', 'modelInputs', 'run-simulation'];
    this.botsDataSource = new BotListDataSource(this._mainService);

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
      .getHistoricalPriceData(
      this.selectedSecurity.ticker,
      this.startDate.toISOString().slice(0, 10),
      this.endDate.toISOString().slice(0, 10),
      this.selectedFrequency,
      forceRefresh
      )
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
    this.stockChart = AmCharts.makeChart('stockChart', config);
    this.stockChart.dataSets.push({
      title: 'Target Stock Data',
      fieldMappings: FieldMaps.candleFieldMap,
      dataProvider: this.chartData1,
      categoryField: 'date',
      compared: false
    });
    this.stockChart.dataSets.push({
      title: 'Signal Data',
      fieldMappings: [
        {
          fromField: 'portfolioValue',
          toField: 'close'
        }
      ],
      dataProvider: this.chartData2,
      categoryField: 'date',
      compared: true
    });
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

        k.tradeBook.series.forEach(item => {
          item.date = new Date(item.date)
        });
        this.chartData1 = k.tradeBook.series;

        k.tradeBook.tradeEntries.forEach(item => {
          item.graph = 'g1';
          item.date = new Date(item.date)
        });
        console.log(k);
        this.chartData2 = k.tradeBook.tradeEntries;

        this.stockChart.dataSets[0].title = k.targetTicker;
        this.stockChart.dataSets[0].dataProvider = k.tradeBook.series;
        this.stockChart.dataSets[0].stockEvents = k.tradeBook.tradeEntries;

        this.stockChart.dataSets[1].title = k.name;
        this.stockChart.dataSets[1].dataProvider = k.tradeBook.series;


        this.stockChart.validateData();

        this.currentBot = k;
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
