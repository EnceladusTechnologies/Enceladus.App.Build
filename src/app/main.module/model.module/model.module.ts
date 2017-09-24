import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelListComponent } from './model-list.component/model-list.component';
import { ModelPageComponent } from './model-page.component/model-page.component';
import { Routes, RouterModule } from '@angular/router';
import { ModelGuardService } from './model-guard.service';
import { SharedModule } from '../../shared.module/shared.module';
const mainRoutes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: '',
    component: ModelPageComponent,
    canActivate: [ModelGuardService],
    children: [
      {
        path: 'list',
        component: ModelListComponent
      }
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(mainRoutes),
    SharedModule
  ],
  declarations: [ModelListComponent, ModelPageComponent],
  providers: [ModelGuardService]
})
export class ModelModule { }
