import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login.component/login.component';
import { LoginPageComponent } from './login-page.component/login-page.component';

const loginRoutes: Routes = [
    {
        path: '',
        redirectTo: '/login-page',
        pathMatch: 'full'
    },
    {
        path: '',
        component: LoginPageComponent,
        data: {
            menuItem: 'Login',
            title: 'Sign In'
        }
    },
    {
        path: 'login-handler',
        component: LoginComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(loginRoutes)],
    exports: [RouterModule]
})

export class LoginRoutingModule { }
