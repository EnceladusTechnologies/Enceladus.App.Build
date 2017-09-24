import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelListComponent } from './model-list.component/model-list.component';
import { ModelPageComponent } from './model-page.component/model-page.component';
import { Routes, RouterModule } from '@angular/router';
import { ModelGuardService } from './model-guard.service';
const mainRoutes: Routes = [
  {
      path: '',
      component: ModelPageComponent,
      canActivate: [ModelGuardService],
      children: [
          {
              path: 'model-list',
              component: ModelListComponent
          }
      ]
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(mainRoutes),
    CommonModule
  ],
  declarations: [ModelListComponent, ModelPageComponent],
  providers: [ModelGuardService]
})
export class ModelModule { }
