import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';

import { PrimaryKeyServiceService } from './primary-key-service.service';
import { FriendPrimaryKeyService } from './friend-primary-key.service';



@NgModule({
  declarations: [
    AppComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [PrimaryKeyServiceService,FriendPrimaryKeyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
