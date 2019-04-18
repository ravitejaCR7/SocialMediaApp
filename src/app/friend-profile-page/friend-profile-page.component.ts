import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {PrimaryKeyServiceService} from '../primary-key-service.service';

@Component({
  selector: 'app-friend-profile-page',
  templateUrl: './friend-profile-page.component.html',
  styleUrls: ['./friend-profile-page.component.css']
})
export class FriendProfilePageComponent implements OnInit {

  isFriend = '';
  friendEmailId: string;
  emailId: string;
  friendProfilePicture: string;
  friendName: string;
  constructor(private http: HttpClient, private route: ActivatedRoute,  private router: Router , private primaryKeyService: PrimaryKeyServiceService) { }

  ngOnInit() {
    this.friendEmailId = this.route.snapshot.paramMap.get('id');
    this.emailId = this.primaryKeyService.getEmailId();
    console.log('asdasd : ' + this.friendEmailId);
    if (this.emailId === this.friendEmailId) {
      this.router.navigate(['/myProfilePage']);
    }

    let obs = this.http.get('http://localhost:3000/person/specificUserInfo/' + this.emailId);
      obs.subscribe((data: any) => {
      this.friendName = data.userModel.name;
      if ( data.userModel.personPic != null ) {
        if ( data.userModel.personPic.endsWith('.JPG') || data.userModel.personPic.endsWith('.jpg') || data.userModel.personPic.endsWith('.png')) {
          console.log('Image ...');
          this.friendProfilePicture = 'http://localhost:3000/uploads/' + data.userModel.personPic;
        } else {
          this.friendProfilePicture = 'http://localhost:3000/uploads/default.jpeg';
        }
      }

    });

    obs = this.http.get('http://localhost:3000/person/getTheFriendRequestInfo' + this.emailId + '/' + this.friendEmailId);
    obs.subscribe((data: any) => {
        this.isFriend = data.res;
    });
  }



  addFriend() {
    const obs = this.http.get('http://localhost:3000/person/createNotificationForFriends' + this.emailId + '/' + this.friendEmailId);
    obs.subscribe((data: any) => {
      this.isFriend = '2';
      this.router.navigate([this.router.url]);

    });

  }

  selectOption($event) {
    if ($event.target.value === '1') {
      const obs = this.http.get('http://localhost:3000/person/acceptFriend' + this.emailId + '/' + this.friendEmailId);
      obs.subscribe((data: any) => {

      });
    } else {

    }
  }

  cancelRequest() {
    const obs = this.http.get('http://localhost:3000/person/cancelRequest' + this.emailId + '/' + this.friendEmailId);
    obs.subscribe((data: any) => {


    });
  }

  removeFriend() {
    const obs = this.http.get('http://localhost:3000/person/removeFriend' + this.emailId + '/' + this.friendEmailId);
    obs.subscribe((data: any) => {


    });
  }
}
