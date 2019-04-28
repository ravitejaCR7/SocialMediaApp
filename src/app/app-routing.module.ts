import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationUserComponent } from './registration-user/registration-user.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PostComponent } from './post/post.component';
import { SearchComponent } from './search/search.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { MessagingComponent } from './messaging/messaging.component';
import { ViewAccountComponent } from './view-account/view-account.component';
import { SearchEachChildComponent } from './search-each-child/search-each-child.component';
import { FriendProfilePageComponent } from './friend-profile-page/friend-profile-page.component';
import { MyProfilePageComponent } from './my-profile-page/my-profile-page.component';
import { SocketMessengingComponent } from './socket-messenging/socket-messenging.component';

const routes: Routes = [
  {path:'register' , component: RegistrationUserComponent},
  {path:'login' , component: LoginUserComponent},
  {path:'landing' , component: LandingPageComponent,
  children:[
    {path: 'notifications',component:NotificationsComponent },
    {path: 'post',component:PostComponent },
    {path: 'search',component:SearchComponent },
    {path: 'privacy',component:PrivacyComponent },
    {path: 'messaging',component:MessagingComponent, children: [
            {path: 'socketmessenger/:id', component : SocketMessengingComponent }
    ]},
    {path: 'viewaccount', component: ViewAccountComponent },
    {path: 'friendAccount/:id', component: FriendProfilePageComponent },
    {path: 'myProfilePage', component : MyProfilePageComponent },

  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [RegistrationUserComponent,
  LoginUserComponent, LandingPageComponent, NotificationsComponent, PostComponent, SearchComponent, PrivacyComponent,
 MessagingComponent, ViewAccountComponent, SearchEachChildComponent,
  FriendProfilePageComponent, MyProfilePageComponent, SocketMessengingComponent];
