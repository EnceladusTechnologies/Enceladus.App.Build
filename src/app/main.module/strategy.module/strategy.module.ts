import { NgModule } from '@angular/core';
import { StrategyListComponent } from './strategy-list.component/strategy-list.component';
import { BotStrategyPageComponent } from './bot-strategy-page.component/bot-strategy-page.component';
import { BotStrategyGuardService } from './bot-strategy-guard.service';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module/shared.module';
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
      }
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(mainRoutes),
    SharedModule
  ],
  declarations: [
    StrategyListComponent,
    BotStrategyPageComponent
  ],
  providers: [BotStrategyGuardService]
})
export class StrategyModule { }
