import { Component, OnInit, OnDestroy } from '@angular/core';
import { Frequency, ExchangeListItem, SecuritiesListItem, Company, PriceListItem } from '../../../shared.module/models/intrinio-vm';
import { StockDataViewModel, StockDetailsViewModel } from '../../../shared.module/models/stock-vm';
import { BotResultVM, BotListItemVM } from '../../../shared.module/models/bots-vm';
import { MainService } from '../../main.service';
import { IntrinioService } from '../../intrinio.service';
import { SnackBarService } from '../../../core.module/services/snackbar.service';
import { ChartConfigs } from './chartConfig';
import { ChartConfig, FieldMaps } from '../../../shared.module/models/chart-vm';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

declare var AmCharts: any;

@Component({
  selector: 'app-simulation-dashboard',
  templateUrl: './simulation-dashboard.component.html',
  styleUrls: ['./simulation-dashboard.component.scss']
})
export class SimulationDashboardComponent implements OnInit, OnDestroy {

  public stockChart: any;
  public currentBot: BotResultVM;

  chartData1 = [];
  chartData2 = [];

  botsDisplayedColumns: string[];
  botsDataSource: BotListDataSource;
  isExchangeSearchBusy: boolean;
  isSecuritySearchBusy: boolean;
  isBusy: boolean;

  constructor(
    private _mainService: MainService,
    private _intrinioService: IntrinioService,
    private _snackBar: SnackBarService
  ) { }

  ngOnInit() {
    this.botsDisplayedColumns = ["name", "author", "modelInputs", "run-simulation"];
    this.botsDataSource = new BotListDataSource(this._mainService);

    this.setupChart(ChartConfigs.StockChart);

  }
  ngOnDestroy() {
    this.stockChart.clear();
  }

  setupChart(config: ChartConfig) {
    this.stockChart = AmCharts.makeChart("stockChart", config);
    this.stockChart.dataSets.push({
      title: "Target Stock Data",
      fieldMappings: FieldMaps.candleFieldMap,
      dataProvider: this.chartData1,
      categoryField: "date",
      compared: false
    });
    this.stockChart.dataSets.push({
      title: "Signal Data",
      fieldMappings: [
        {
          fromField: 'portfolioValue',
          toField: 'close'
        }
      ],
      dataProvider: this.chartData2,
      categoryField: "date",
      compared: true
    });
  }


  public runSimulation(bot: BotListItemVM) {
    this.isBusy = true;
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
        this.isBusy = false;
      }, err => {
        this._snackBar.open('error', err, 'OK');
        this.isBusy = false;
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
