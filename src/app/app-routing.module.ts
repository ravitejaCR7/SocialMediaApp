import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationUserComponent } from './registration-user/registration-user.component';

const routes: Routes = [
  {path:'register' , component: RegistrationUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [RegistrationUserComponent];
