import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PrimaryKeyServiceService} from '../primary-key-service.service';
import {FriendPrimaryKeyService} from '../friend-primary-key.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-friend-profile-request',
  templateUrl: './friend-profile-request.component.html',
  styleUrls: ['./friend-profile-request.component.css']
})
export class FriendProfileRequestComponent implements OnInit {


  emailId: string;
  friendEmailId: string;
  isFriend: string;
  constructor(private http: HttpClient, private router: Router, private primaryKeyService: PrimaryKeyServiceService, private friendPrimaryKeyService: FriendPrimaryKeyService) { }

  ngOnInit() {
    console.log("223");
    this.emailId = this.primaryKeyService.getEmailId();
    this.friendEmailId = this.friendPrimaryKeyService.getEmailId();
    let obs = this.http.get('http://localhost:3000/person/getTheFriendRequestInfo/' + this.emailId + '/' + this.friendEmailId);
    obs.subscribe((data: any) => {
      this.isFriend = data.res;
    });

  }

  addFriend() {
    const obs = this.http.get('http://localhost:3000/person/createNotificationForFriends/' + this.emailId + '/' + this.friendEmailId);
    obs.subscribe((data: any) => {
      console.log("Sent Notification");
      this.isFriend = '2';
      this.router.navigate([this.router.url]);

    });

  }

  selectOption($event) {
    if ($event.target.value === '1') {
      console.log("Accept");
      const obs = this.http.get('http://localhost:3000/person/acceptingFriendRequest/' + this.emailId + '/' + this.friendEmailId);
      obs.subscribe((data: any) => {
        this.isFriend = '3';
        this.router.navigate([this.router.url]);
      });
    } else {
      console.log("Decline");
      const obs = this.http.get('http://localhost:3000/person/cancelNotificationOrRequest/' + this.friendEmailId + '/' + this.emailId);
      obs.subscribe((data: any) => {
        this.isFriend = '1';
        this.router.navigate([this.router.url]);
      });
    }
  }

  cancelRequest() {
    console.log('http://localhost:3000/person/cancelNotificationOrRequest/' + this.emailId + '/' + this.friendEmailId);
    const obs = this.http.get('http://localhost:3000/person/cancelNotificationOrRequest/' + this.emailId + '/' + this.friendEmailId);
    // http://localhost:3000/person/cancelNotificationOrRequest/ranjith@gmail.com/sahith.adudodla@gmail.com
      obs.subscribe((data: any) => {
        console.log("success");
        this.isFriend = '1';
        this.router.navigate([this.router.url]);
    });
  }

  removeFriend() {
    const obs = this.http.get('http://localhost:3000/person/removeFriend/' + this.emailId + '/' + this.friendEmailId);
    obs.subscribe((data: any) => {
      this.isFriend = '1';
      this.router.navigate([this.router.url]);
    });
  }
}
