import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './core.module/services/auth-guard.service';
import { CallbackComponent } from './callback.component/callback.component';
const routes: Routes = [
    // { path: 'login-page', loadChildren: './login.module/login.module#LoginModule' },
    {
        path: '',
        loadChildren: './main.module/main.module#MainModule',
        canActivate: [AuthGuardService],
        data: {
            menuItem: 'Main',
            title: 'Enceladus'
        }
    },
    { path: 'callback', component: CallbackComponent },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        // useHash: true,
        // enableTracing: true, // <-- debugging purposes only
    })],
    exports: [RouterModule],
    providers: [AuthGuardService]
})
export class AppRoutingModule { }

