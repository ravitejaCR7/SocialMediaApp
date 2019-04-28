import { Component, OnInit } from '@angular/core';
import { ChatIoServiceService } from '../chat-io-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PrimaryKeyServiceService} from '../primary-key-service.service';
import {HttpClient} from '@angular/common/http';
import * as $ from 'jquery';

@Component({
  selector: 'app-socket-messenging',
  templateUrl: './socket-messenging.component.html',
  styleUrls: ['./socket-messenging.component.css']
})
export class SocketMessengingComponent implements OnInit {


  flagObj:Boolean = false;

  friendEmailId: string;
  chatId:String;
  user:String;
  room:String;
  messageText:String;
  messageArray:Array<{user:String, message:String}> = [];

  thisUsersName:String;

  friendProfilePicture:String;
  friendName:String;

  constructor(private http: HttpClient, private chatService: ChatIoServiceService, private route: ActivatedRoute, private primaryKeyService: PrimaryKeyServiceService ) {

    this.friendEmailId = this.route.snapshot.paramMap.get('id');

    this.route.params.subscribe(routeParams => {
              // this.cityName = routeParams.name;
              this.friendEmailId = routeParams.id;
              console.log("testing subs : "+this.friendEmailId);
              this.ngOnInit();
            });

    this.chatService.newUserJoined()
        .subscribe( data => this.messageArray.push(data) );

    this.chatService.userLeftRoom()
        .subscribe( data => this.messageArray.push(data) );

    this.chatService.newMessageReceived()
        .subscribe( data=>this.messageArray.push(data) );


    let obsChatRoom = this.http.get('http://localhost:3000/person/getTheChatRoom/' + this.primaryKeyService.getEmailId()+"/"+this.friendEmailId);
    obsChatRoom.subscribe((data: any) => {


        });
  }

  ngOnInit() {
    console.log("mess : "+this.friendEmailId);
    console.log("4321 : "+this.friendEmailId);

    let obs = this.http.get('http://localhost:3000/person/specificUserInfo/' + this.friendEmailId);
    obs.subscribe((data: any) => {
      this.friendName = data.userModel.name;
      if (data.userModel.personPic != null) {
        if (data.userModel.personPic.endsWith('.JPG') || data.userModel.personPic.endsWith('.jpg') || data.userModel.personPic.endsWith('.png')) {
          console.log('Image ...' + 'http://localhost:3000/uploads/' + data.userModel.personPic);
          this.friendProfilePicture = 'http://localhost:3000/uploads/' + data.userModel.personPic;
        } else {
          this.friendProfilePicture = 'http://localhost:3000/uploads/default.jpeg';
        }
      }

    });

    //to get this user's username
    let obs1 = this.http.get('http://localhost:3000/person/specificUserInfo/' + this.primaryKeyService.getEmailId());
    obs1.subscribe((data: any) => {
      this.thisUsersName = data.userModel.name;

    });


    let obsChatRoom = this.http.get('http://localhost:3000/person/getTheChatRoom/' + this.primaryKeyService.getEmailId()+"/"+this.friendEmailId);
    obsChatRoom.subscribe((data: any) => {

          if(data.userModel == null){
            this.flagObj = true;
          }
          else{
            this.flagObj = false;
            console.log('chatId is : ' + data.userModel._id);
            this.chatId = data.userModel._id;

            if( this.chatId.length > 0 ){
              this.chatService.joinRoom({userName:this.primaryKeyService.getEmailId(), userRoom:this.chatId});
            }
          }

        });

  }

  sendMessage()
  {
    if( this.chatId.length > 0 && this.messageText.length > 0 ){
      this.chatService.sendMessage({userName:this.thisUsersName, userRoom:this.chatId, message:this.messageText});
      var d = $('.msgs');
        d.append( "<br/>" );
        var height = d.prop("scrollHeight");
        console.log('height is : ' + height);
        d.scrollTop(height+20);
    }
    this.messageText="";
  }

}
