import { Component, OnInit } from '@angular/core';

import { TradingModelListItemVM } from '../../../shared.module/models/bots-vm';
import { ModelService } from '../model.service';
import { SnackBarService } from '../../../core.module/services/snackbar.service';
import { DataSource } from "@angular/cdk/collections";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';


@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.scss']
})
export class ModelListComponent implements OnInit {

  isBusy: boolean;
  models: TradingModelListItemVM[];
  modelsDisplayedColumns: string[];
  modelsDataSource: ModelListDataSource;
  constructor(private _snackBar: SnackBarService,
    private _modelService: ModelService) { }

  ngOnInit() {
    this.modelsDisplayedColumns = ["name", "author", "description", "modelInputs"];
    this.modelsDataSource = new ModelListDataSource(this._modelService);
  }

}
export class ModelListDataSource extends DataSource<any> {

  constructor(private _modelService: ModelService) { super(); }

  connect(): Observable<TradingModelListItemVM[]> {
    return this._modelService.getModels();
  }

  disconnect() { }
}
