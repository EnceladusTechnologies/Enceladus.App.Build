import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { TextMaskModule } from 'angular2-text-mask';
import { MaterialModule } from './material.module/material.module';

import { ComponentSpinnerComponent } from './component-spinner.component/component-spinner.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    // TextMaskModule,
    MaterialModule
  ],
  declarations: [
    ComponentSpinnerComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    ComponentSpinnerComponent,
    // TextMaskModule
  ]
})
export class SharedModule { }
