import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {PrimaryKeyServiceService} from '../primary-key-service.service';
import {FriendPrimaryKeyService} from '../friend-primary-key.service';

@Component({
  selector: 'app-friend-profile-page',
  templateUrl: './friend-profile-page.component.html',
  styleUrls: ['./friend-profile-page.component.css']
})
export class FriendProfilePageComponent implements OnInit {

  isFriend: Boolean;
  friendEmailId: string;
  emailId: string;
  friendProfilePicture: string;
  friendName: string;
  constructor(private http: HttpClient, private route: ActivatedRoute,  private router: Router , private primaryKeyService: PrimaryKeyServiceService, private friendPrimaryKeyService: FriendPrimaryKeyService) { }

  ngOnInit() {
    this.friendEmailId = this.route.snapshot.paramMap.get('id');
    this.friendPrimaryKeyService.setEmailId(this.friendEmailId);
    console.log("check "+ this.friendPrimaryKeyService.getEmailId());
    this.emailId = this.primaryKeyService.getEmailId();
    console.log('asdasd : ' + this.friendEmailId);
    if (this.emailId === this.friendEmailId) {
      this.isFriend = true;
      console.log('Matched!! ' + this.emailId + ' ' + this.friendEmailId);
      console.log(this.router.url);
      this.router.navigate(['../landing/myProfilePage']);
    } else {
      console.log('Not matched');
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
    }


  }
}
