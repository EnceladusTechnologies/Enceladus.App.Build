import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';

import { CacheService } from 'ng2-cache/ng2-cache';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthHttpService } from './services/auth-http.service';
import { AccountService } from './services/account.service';
import { ConfigurationService } from './services/configuration.service';
import { SnackBarService } from './services/snackbar.service';

import { LoginModule } from '../login.module/login.module';


@NgModule({
  imports: [
    LoginModule
  ],
  declarations: [],
  providers: [
    AuthGuardService,
    AuthHttpService,
    AccountService,
    ConfigurationService,
    CacheService,
    SnackBarService,
  ]
})
export class CoreModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        AuthGuardService,
        AuthHttpService,
        AccountService,
        ConfigurationService,
        CacheService,
        SnackBarService
      ]
    };
  }

  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
