import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PrimaryKeyServiceService } from '../primary-key-service.service';
import { FriendPrimaryKeyService } from '../friend-primary-key.service';


@Component({
  selector: 'app-my-profile-page',
  templateUrl: './my-profile-page.component.html',
  styleUrls: ['./my-profile-page.component.css']
})
export class MyProfilePageComponent implements OnInit {

  userPrimaryKey = "";
  userPrimaryMailId:string="";

  arrayOfIds:string[];

  constructor(private http: HttpClient , private router: Router, private primaryKeyService: PrimaryKeyServiceService, private friendPrimaryKeyService: FriendPrimaryKeyService)
  {
  }

  ngOnInit() {
    this.userPrimaryKey = this.primaryKeyService.getPrimaryKey();
    console.log('key in my profile : '+this.userPrimaryKey);
    this.friendPrimaryKeyService.setEmailId("");

    let obs = this.http.get('http://localhost:3000/person/userInfo/'+this.userPrimaryKey);
    obs.subscribe((data:any) =>
        {

          this.userPrimaryMailId = data.email;

          console.log("privacy key mail in my profile module "+this.userPrimaryMailId);

          let gettingThePostsObs = this.http.get('http://localhost:3000/person/postedByThisUser/'+this.userPrimaryMailId);
          gettingThePostsObs.subscribe((data:any) =>
              {
                console.log("All posts "+data);

                this.arrayOfIds = new Array();
                this.arrayOfIds = data.userModel.map(a => a._id) ;
                console.log(" length  "+this.arrayOfIds);

              });
        });


  }

}
