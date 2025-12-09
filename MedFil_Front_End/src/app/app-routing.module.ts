import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegistrationComponent} from "./registration/registration.component";
import {MainhomeComponent} from "./mainhome/mainhome.component";
import {TopNavFooterComponent} from "./top-nav-footer/top-nav-footer.component";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {ViewshopsComponent} from "./viewshops/viewshops.component";
import {AddshopsComponent} from "./addshops/addshops.component";
import {AddmedicineComponent} from "./addmedicine/addmedicine.component";
import { SearchMedicinesComponent } from './searchMedicines/searchMedicines.component';
import { ListMedicinesComponent } from './listMedicines/listMedicines.component';
import { ForgotPasswordComponent } from './forgotpassword/forgotpassword.component';

const routes: Routes = [
    {
      path : '',
      redirectTo: 'medfill/main-home',
      pathMatch : 'full'
    },
    {
      path: 'medfill/main-home',
      component: TopNavFooterComponent,
      children: [
        {
          path: "",
          component: MainhomeComponent
        },
        {
          path: "user-registration",
          component: RegistrationComponent,
          data :
          {
            isUser : true
          }
        },
        {
          path: "merchant-registration",
          component: RegistrationComponent,
          data :
            {
              isUser : false
            }
        },
        {
              path: "forgotpassword",
              component: ForgotPasswordComponent
        },
        {
          path : 'login',
          component: LoginComponent,
          children: [
            
          ]
        }
      ]
    },
    {
      path: 'medfill/user-home',
      component: HomeComponent,
      children: [
        {
          path: 'view-shops',
          component: ViewshopsComponent
        },
        {
          path : 'addshops',
          component: AddshopsComponent
        },
        {
          path : 'addmedicine',
          component: AddmedicineComponent
        },
        {
          path : 'searchmedicine',
          component: SearchMedicinesComponent
        },
        {
          path : 'listmedicine',
          component: ListMedicinesComponent
        }
      ]
    }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
