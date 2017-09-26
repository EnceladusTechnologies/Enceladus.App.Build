import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatSnackBarModule, MatSnackBar, MatInputModule, MatButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginRoutingModule } from './login-routing.module';

import { LoginService } from './login.service';

import { LoginComponent } from './login.component/login.component';
import { LoginPageComponent } from './login-page.component/login-page.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent,
    LoginPageComponent
  ],
  providers: [LoginService, MatSnackBar]
})
export class LoginModule { }
