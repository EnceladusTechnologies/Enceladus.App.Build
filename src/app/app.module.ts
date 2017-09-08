import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { CoreModule } from 'app/core.module/core.module';
import { AppRoutingModule } from 'app/app-routing.module';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MainDataService } from './main.module/main-data.service';

import 'hammerjs';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    BrowserModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(MainDataService, { passThruUnknownUrl: true }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
