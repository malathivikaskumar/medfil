import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { MainhomeComponent } from './mainhome/mainhome.component';
import { TopNavFooterComponent } from './top-nav-footer/top-nav-footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';


import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from "angularx-social-login";
import {MainService} from "./main.service";
import { ViewshopsComponent } from './viewshops/viewshops.component';
import { AddshopsComponent } from './addshops/addshops.component';
import { AddmedicineComponent } from './addmedicine/addmedicine.component';
import { SearchMedicinesComponent } from './searchMedicines/searchMedicines.component';
import { ListMedicinesComponent } from './listMedicines/listMedicines.component';
import { ForgotPasswordComponent } from './forgotpassword/forgotpassword.component';



@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    MainhomeComponent,
    TopNavFooterComponent,
    HomeComponent,
    LoginComponent,
    ViewshopsComponent,
    AddshopsComponent,
    AddmedicineComponent,
    SearchMedicinesComponent,
    ListMedicinesComponent,
    AddshopsComponent,
    ForgotPasswordComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        SocialLoginModule,
        FormsModule
    ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '734667496978-q235k8b2sof8ecot8hrqq50427hv2l19.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,

    },
    MainService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
