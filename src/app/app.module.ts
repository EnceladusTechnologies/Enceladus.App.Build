import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { CoreModule } from './core.module/core.module';
import { AppRoutingModule } from './app-routing.module';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MainDataService } from './main.module/main-data.service';

import 'hammerjs';

import { AuthService } from './auth.service';
import { CallbackComponent } from './callback.component/callback.component';
import { MATERIAL_COMPATIBILITY_MODE } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    BrowserModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(MainDataService, { passThruUnknownUrl: true }),
  ],
  providers: [
    AuthService,
    { provide: MATERIAL_COMPATIBILITY_MODE, useValue: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
