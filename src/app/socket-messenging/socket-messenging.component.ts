import { Component, OnInit } from '@angular/core';
import { ChatIoServiceService } from '../chat-io-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PrimaryKeyServiceService} from '../primary-key-service.service';
import {HttpClient} from '@angular/common/http';

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

  constructor(private http: HttpClient, private chatService: ChatIoServiceService, private route: ActivatedRoute, private primaryKeyService: PrimaryKeyServiceService ) {

    this.friendEmailId = this.route.snapshot.paramMap.get('id');

    this.chatService.newUserJoined()
        .subscribe( data => this.messageArray.push(data) );

    this.chatService.userLeftRoom()
        .subscribe( data => this.messageArray.push(data) );

    this.chatService.newMessageReceived()
        .subscribe( data=>this.messageArray.push(data) );


    let obsChatRoom = this.http.get('http://localhost:3000/person/getTheChatRoom/' + this.primaryKeyService.getEmailId()+"/"+this.friendEmailId);
    obsChatRoom.subscribe((data: any) => {

        //this redundant call is just to make early save and get the id of the chat room

        });
  }

  ngOnInit() {
    console.log("mess : "+this.friendEmailId);
    console.log("mess1 sender : "+this.primaryKeyService.getEmailId());

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
      this.chatService.sendMessage({userName:this.primaryKeyService.getEmailId(), userRoom:this.chatId, message:this.messageText});
    }
  }

}
