import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimulationPageComponent } from './simulation-page.component/simulation-page.component';
import { SimulationGuardService } from './simulation-guard.service';
import { SimulationDashboardComponent } from './simulation-dashboard.component/simulation-dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module/shared.module';
const mainRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: SimulationPageComponent,
    canActivate: [SimulationGuardService],
    children: [
      {
        path: 'dashboard',
        component: SimulationDashboardComponent
      }
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(mainRoutes),
    SharedModule
  ],
  declarations: [SimulationPageComponent, SimulationDashboardComponent],
  providers: [SimulationGuardService]
})
export class SimulationModule { }
