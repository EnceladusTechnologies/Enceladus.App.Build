import { NgModule } from '@angular/core';
import { StrategyListComponent } from './strategy-list.component/strategy-list.component';
import { BotStrategyPageComponent } from './bot-strategy-page.component/bot-strategy-page.component';
import { BotStrategyGuardService } from './bot-strategy-guard.service';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module/shared.module';

import { StrategyService } from './strategy.service';
import { BotStrategyProfileComponent } from './bot-strategy-profile.component/bot-strategy-profile.component';
import { BotStrategyProfileResolver } from './bot-strategy-profile-resolver.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModelConfigQuestionComponent } from './model-config-question/model-config-question.component';
import { QuestionControlService } from 'app/main.module/strategy.module/model-config-question/question-control.service';

const mainRoutes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: '',
    component: BotStrategyPageComponent,
    canActivate: [BotStrategyGuardService],
    children: [
      {
        path: 'list',
        component: StrategyListComponent

      },
      {
        path: 'list/:id',
        component: BotStrategyProfileComponent,
        resolve: {
          botStrategy: BotStrategyProfileResolver
        }

      }
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(mainRoutes),

    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    StrategyListComponent,
    BotStrategyPageComponent,
    BotStrategyProfileComponent,
    ModelConfigQuestionComponent
  ],
  providers: [
    BotStrategyGuardService,
    StrategyService,
    BotStrategyProfileResolver,
    QuestionControlService
  ]

})
export class StrategyModule { }
