import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module/shared.module';
import { MainRoutingModule } from './main-routing.module';

import { MainService } from './main.service';
import { IntrinioService } from './intrinio.service';

import { MainPageComponent } from './main-page.component/main-page.component';
import { MainDashboardComponent } from './main-dashboard.component/main-dashboard.component';

@NgModule({
  imports: [
    MainRoutingModule,
    SharedModule
  ],
  declarations: [
    MainPageComponent,
    MainDashboardComponent
  ],
  providers: [
    MainService,
    IntrinioService
  ]
})
export class MainModule { }
