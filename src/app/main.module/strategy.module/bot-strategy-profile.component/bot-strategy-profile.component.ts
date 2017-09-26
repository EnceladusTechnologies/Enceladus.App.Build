import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BotStrategyVm, TradingModelListItemVM } from '../../../shared.module/models/bots-vm';
import { StrategyService } from '../../../main.module/strategy.module/strategy.service';
import { SnackBarService } from '../../../core.module/services/snackbar.service';
import { QuestionBase, ConfigBaseControlType } from '../model-config-question/question-types';
import { FormGroup, NgForm, FormControl } from '@angular/forms';
import { QuestionControlService } from 'app/main.module/strategy.module/model-config-question/question-control.service';

@Component({
  selector: 'app-bot-strategy-profile',
  templateUrl: './bot-strategy-profile.component.html',
  styleUrls: ['./bot-strategy-profile.component.scss']
})
export class BotStrategyProfileComponent implements OnInit {
  @ViewChild('botStrategyForm') form: NgForm;
  isBusy: boolean;
  model: BotStrategyVm;
  models: TradingModelListItemVM[];
  // modelConfigs: QuestionBase<any>[];
  ConfigBaseControlType = ConfigBaseControlType;
  formGroup: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _strategyService: StrategyService,
    private _snackBar: SnackBarService,
    private qcs: QuestionControlService
  ) {
    this.formGroup = new FormGroup({
      nameCntrl: new FormControl(),
      descCntrl: new FormControl(),
      orderTypeCntrl: new FormControl(),
      amntCntrl: new FormControl(),
      modelCntrl: new FormControl()
    });
  }

  ngOnInit() {
    this.isBusy = true;
    this.route.data
      .subscribe((data: { botStrategy: BotStrategyVm }) => {
        data.botStrategy.model.configurationQuestions.forEach(q => {
          q.maskConfig = QuestionBase.CreateMask(q.controlType);
        })
        this.qcs.addToFormGroup(data.botStrategy.model.configurationQuestions, this.formGroup, false);
        this.model = data.botStrategy;
        console.log(this.model);
      });
    this._strategyService.getModels()
      .subscribe(items => {
        this.models = items;
        this.isBusy = false;
      }, err => {
        this.isBusy = false;
        this._snackBar.open('error', err, 'OK');
      })

  }

  modelChanged(modelId: string) {
    // this.modelConfigs = [];
    if (this.models) {
      const selectedModel = this.models.find(k => k.id === modelId);
      this.isBusy = true;
      this._strategyService.getModelConfigs(modelId)
        .subscribe(k => {
          this.isBusy = false;
          this.qcs.addToFormGroup(k, this.formGroup, false);
          // this.modelConfigs = k;
          console.log(k);
        }, err => {
          this.isBusy = false;
        })
    }
  }

}
