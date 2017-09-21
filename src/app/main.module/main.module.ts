import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module/shared.module';
import { MainRoutingModule } from './main-routing.module';

import { MainService } from './main.service';
import { IntrinioService } from './intrinio.service';
// import { AmChartsModule } from "@amcharts/amcharts3-angular";
import { MainPageComponent } from './main-page.component/main-page.component';
import { MainDashboardComponent } from './main-dashboard.component/main-dashboard.component';
import { ChartComponent } from './chart-component/charts.component';

@NgModule({
  imports: [
    MainRoutingModule,
    SharedModule
    // AmChartsModule
  ],
  declarations: [
    MainPageComponent,
    MainDashboardComponent,
    ChartComponent
  ],
  providers: [
    MainService,
    IntrinioService
  ]
})
export class MainModule { }
