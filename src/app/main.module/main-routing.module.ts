import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'app/core.module/services/auth-guard.service';
import { MainPageComponent } from './main-page.component/main-page.component';
import { MainDashboardComponent } from './main-dashboard.component/main-dashboard.component';
const mainRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
        // canActivate: [AuthGuardService]
    },
    {
        path: '',
        component: MainPageComponent,
        // canActivate: [AuthGuardService],
        children: [
            {
                path: 'dashboard',
                component: MainDashboardComponent,
                // canActivate: [AuthGuardService],
                data: {
                    menuItem: 'Dashboard',
                    title: 'Home'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(mainRoutes)],
    exports: [RouterModule],
    providers: [AuthGuardService]
})

export class MainRoutingModule { }
