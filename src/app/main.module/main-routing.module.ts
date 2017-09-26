import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page.component/main-page.component';
import { MainDashboardComponent } from './main-dashboard.component/main-dashboard.component';
import { MainPageGuardService } from './main-page-guard.service';
const mainRoutes: Routes = [
    {
        path: '',
        redirectTo: 'simulation-page',
        pathMatch: 'full',
        canActivate: [MainPageGuardService]
    },
    {
        path: '',
        component: MainPageComponent,
        canActivate: [MainPageGuardService],
        children: [
            {
                path: 'simulation-page',
                loadChildren: './simulation.module/simulation.module#SimulationModule',
            },
            {
                path: 'model-page',
                loadChildren: './model.module/model.module#ModelModule',
            },
            {
                path: 'bot-strategy-page',
                loadChildren: './strategy.module/strategy.module#StrategyModule',
            },
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(mainRoutes)],
    exports: [RouterModule],
    providers: [MainPageGuardService]
})

export class MainRoutingModule { }
