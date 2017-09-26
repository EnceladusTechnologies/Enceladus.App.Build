import { Component, OnInit } from '@angular/core';
import { DataSource } from "@angular/cdk/collections";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { MainService } from '../../main.service';
import { SnackBarService } from '../../../core.module/services/snackbar.service';
import { BotListItemVM } from '../../../shared.module/models/bots-vm';
import { StrategyService } from 'app/main.module/strategy.module/strategy.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-strategy-list',
  templateUrl: './strategy-list.component.html',
  styleUrls: ['./strategy-list.component.scss']
})
export class StrategyListComponent implements OnInit {
  isBusy: boolean;
  botStrategies: BotListItemVM[];
  botsDisplayedColumns: string[];
  botsDataSource: BotListDataSource;
  constructor(
    private _strategyService: StrategyService,
    private _snackBar: SnackBarService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.botsDisplayedColumns = ["name", "author", "targetSymbol", "modelName", "modelInputs"];
    this.botsDataSource = new BotListDataSource(this._strategyService);
  }
  viewStrategy(id: number) {
    this.router.navigate(['./', id], { relativeTo: this.route });
  }
}
export class BotListDataSource extends DataSource<any> {
  constructor(private _strategyService: StrategyService) { super(); }
  connect(): Observable<BotListItemVM[]> {
    return this._strategyService.getBotStrategies();
  }
  disconnect() { }
}