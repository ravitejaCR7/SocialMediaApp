import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationUserComponent } from './registration-user/registration-user.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
const routes: Routes = [
  {path:'register' , component: RegistrationUserComponent},
  {path:'login' , component: LoginUserComponent},
  {path:'landing' , component: LandingPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [RegistrationUserComponent, LoginUserComponent, LandingPageComponent];
