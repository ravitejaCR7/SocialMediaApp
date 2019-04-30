import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PrimaryKeyServiceService } from '../primary-key-service.service';
import {FriendPrimaryKeyService} from '../friend-primary-key.service';


@Component({
  selector: 'app-view-account',
  templateUrl: './view-account.component.html',
  styleUrls: ['./view-account.component.css']
})
export class ViewAccountComponent implements OnInit {

  thisUserId:String = "";
  randomUserId:String = "";


  isFriend: Boolean = false;
  friendEmailId: string;
  emailId: string;
  friendProfilePicture: string;
  friendName: string;

  arrayOfIds:string[];
  isConnected:boolean;

  selectedPrivacySettings: String = ''; // selected privacy option
  errorFlag:boolean = false; //to control the privacy settings


  //searching the posts content
  searchForPostsContentString:String ="";

  //isAdmin?
  isAdmin:boolean = false;



  constructor( private http: HttpClient , private router: Router , private primaryKeyService: PrimaryKeyServiceService, private friendPrimaryKeyService: FriendPrimaryKeyService ) { }

  ngOnInit() {

    this.thisUserId = this.primaryKeyService.getEmailId();

    this.friendPrimaryKeyService.setEmailId(this.friendEmailId);

    let getRandomId = this.http.get('http://localhost:3000/person/generateRandomMails/' + this.thisUserId);
    getRandomId.subscribe((data: any) => {

          if(data.res == true) {
            this.randomUserId = data.randomId;

            let obs = this.http.get('http://localhost:3000/person/specificUserInfo/' + this.randomUserId);
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



            //write logic to control the privacy
            let gettingTheConnectionDetails = this.http.get('http://localhost:3000/person/areTheseTwoConnected/'+this.primaryKeyService.getEmailId()+"/"+this.randomUserId);
            gettingTheConnectionDetails.subscribe((data:any) =>
                {
                  console.log("gettingTheConnectionDetails "+data);

                  this.isConnected = data.res;

                  console.log("this.isConnected :  "+this.isConnected);

                });


            this.postsMadeByThisUserMethod();


          }
          else {
            this.randomUserId = "serverError";
          }

        });


    // // this.friendEmailId = this.route.snapshot.paramMap.get('id');
    // this.friendPrimaryKeyService.setEmailId(this.friendEmailId);
    // console.log("check "+ this.friendPrimaryKeyService.getEmailId());
    // this.emailId = this.primaryKeyService.getEmailId();
    // console.log('asdasd : ' + this.friendEmailId);

    // //getting the admin details
    // this.isAdmin = this.primaryKeyService.getIsAdmin();



  }

  postsMadeByThisUserMethod() {

    let gettingThePostsObs = this.http.get('http://localhost:3000/person/postedByThisUser/'+this.randomUserId);
    gettingThePostsObs.subscribe((data:any) =>
        {
          console.log("All posts "+data);

          this.arrayOfIds = new Array();
          this.arrayOfIds = data.userModel.map(a => a._id).reverse() ;
          console.log(" length  "+this.arrayOfIds);

        });


  }

}
