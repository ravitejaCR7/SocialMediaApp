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

  arrayOfIds:string[];
  isConnected:boolean;

  selectedPrivacySettings: String = ''; // selected privacy option
  errorFlag:boolean = false; //to control the privacy settings


  //searching the posts content
  searchForPostsContentString:String ="";

  //isAdmin?
  isAdmin:boolean = false;

  constructor(private http: HttpClient, private route: ActivatedRoute,  private router: Router , private primaryKeyService: PrimaryKeyServiceService, private friendPrimaryKeyService: FriendPrimaryKeyService) {

    this.friendEmailId = this.route.snapshot.paramMap.get('id');

    this.route.params.subscribe(routeParams => {
              // this.cityName = routeParams.name;
              this.friendEmailId = routeParams.id;
              console.log("testing constructor : "+this.friendEmailId);
              this.ngOnInit();
            });

  }

  ngOnInit() {


    // this.friendEmailId = this.route.snapshot.paramMap.get('id');
    this.friendPrimaryKeyService.setEmailId(this.friendEmailId);
    console.log("check "+ this.friendPrimaryKeyService.getEmailId());
    this.emailId = this.primaryKeyService.getEmailId();
    console.log('asdasd : ' + this.friendEmailId);

    //getting the admin details
    this.isAdmin = this.primaryKeyService.getIsAdmin();

    if (this.emailId === this.friendEmailId) {
      this.isFriend = true;
      console.log('Matched!! ' + this.emailId + ' ' + this.friendEmailId);
      console.log(this.router.url);
      this.friendPrimaryKeyService.setEmailId("");
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



    // if he is admin, then directly allow him to view the post's
    if(this.isAdmin) {
      this.isConnected = true;
      console.log("!!!!  Admin : "+this.isConnected);
    }
    else {
      //write logic to control the privacy
      let gettingTheConnectionDetails = this.http.get('http://localhost:3000/person/areTheseTwoConnected/'+this.primaryKeyService.getEmailId()+"/"+this.friendPrimaryKeyService.getEmailId());
      gettingTheConnectionDetails.subscribe((data:any) =>
          {
            console.log("gettingTheConnectionDetails "+data);

            this.isConnected = data.res;

            console.log("this.isConnected :  "+this.isConnected);

          });
    }

    this.postsMadeByThisUserMethod();

  }

  postsMadeByThisUserMethod() {

    let gettingThePostsObs = this.http.get('http://localhost:3000/person/postedByThisUser/'+this.friendPrimaryKeyService.getEmailId());
    gettingThePostsObs.subscribe((data:any) =>
        {
          console.log("All posts "+data);

          this.arrayOfIds = new Array();
          this.arrayOfIds = data.userModel.map(a => a._id).reverse() ;
          console.log(" length  "+this.arrayOfIds);

        });


  }


  privacyChangedHandler(event: any){
    this.selectedPrivacySettings = event.target.value;
    console.log(this.selectedPrivacySettings);
    console.log("privacy key of friend"+this.friendEmailId+" : : : : "+this.emailId);
  }


  privacyChange()
  {
    if(this.friendEmailId.length > 0 && this.selectedPrivacySettings.length > 0)
    {
      //send the new privacy value
      let obs = this.http.put('http://localhost:3000/person/privacySettingsChange/'+this.friendEmailId,
      {
        "email":this.friendEmailId,
        "privacy":this.selectedPrivacySettings
      }
      );
      obs.subscribe((data:any) =>
          {
            console.log("successfully changed the privacy settings ");
          }
        );
    }
    else
    {
      //error with the email API
      this.errorFlag = true;
    }
  }

  //deleting this user
  deleteThisUser() {

    // 1)
    let deletingFromUserTable = this.http.get('http://localhost:3000/person/deleteThisUserFromUserTable/'+this.friendEmailId);
    deletingFromUserTable.subscribe((data:any) =>
        {
          console.log("deletingFromUserTable "+data);

          if(data.res == true) {

            // 2)
            let deleteThisUserFromPrivacyTable = this.http.get('http://localhost:3000/person/deleteThisUserFromPrivacyTable/'+this.friendEmailId);
            deleteThisUserFromPrivacyTable.subscribe((data:any) =>
                {
                  console.log("deleteThisUserFromPrivacyTable "+data);

                  if(data.res == true) {

                    // 3)
                    let deleteThisUserFromChatTable = this.http.get('http://localhost:3000/person/deleteThisUserFromChatTable/'+this.friendEmailId);
                    deleteThisUserFromChatTable.subscribe((data:any) =>
                        {
                          console.log("deleteThisUserFromChatTable "+data);

                          if(data.res == true) {

                            // 4)
                            let deleteThisUserFromCommentsTable = this.http.get('http://localhost:3000/person/deleteThisUserFromCommentsTable/'+this.friendEmailId);
                            deleteThisUserFromCommentsTable.subscribe((data:any) =>
                                {
                                  console.log("deleteThisUserFromCommentsTable "+data);

                                  if(data.res == true) {

                                    // 5)
                                    let deleteThisUserFromFriendsTable = this.http.get('http://localhost:3000/person/deleteThisUserFromFriendsTable/'+this.friendEmailId);
                                    deleteThisUserFromFriendsTable.subscribe((data:any) =>
                                        {
                                          console.log("deleteThisUserFromFriendsTable "+data);

                                          if(data.res == true) {

                                            // 6)
                                            let deleteThisUserFromNotifyCommentsTable = this.http.get('http://localhost:3000/person/deleteThisUserFromNotifyCommentsTable/'+this.friendEmailId);
                                            deleteThisUserFromNotifyCommentsTable.subscribe((data:any) =>
                                                {
                                                  console.log("deleteThisUserFromNotifyCommentsTable "+data);

                                                  if(data.res == true) {

                                                    // 7)
                                                    let deleteThisUserFromNotifyFriendsTable = this.http.get('http://localhost:3000/person/deleteThisUserFromNotifyFriendsTable/'+this.friendEmailId);
                                                    deleteThisUserFromNotifyFriendsTable.subscribe((data:any) =>
                                                        {
                                                          console.log("deleteThisUserFromNotifyFriendsTable "+data);

                                                          if(data.res == true) {

                                                            // 8)
                                                            let deleteThisUserFromPostsTable = this.http.get('http://localhost:3000/person/deleteThisUserFromPostsTable/'+this.friendEmailId);
                                                            deleteThisUserFromPostsTable.subscribe((data:any) =>
                                                                {
                                                                  console.log("deleteThisUserFromPostsTable "+data);

                                                                  if(data.res == true) {

                                                                    console.log("Deleted the user successfully!");
                                                                    this.router.navigate(['../landing/myProfilePage']); //not working
                                                                  }

                                                                });

                                                          }

                                                        });

                                                  }

                                                });

                                          }

                                        });

                                  }

                                });

                          }

                        });

                  }

                });

          }

        });

  }


  searchForPostsContent(event:any) {

    this.searchForPostsContentString = event.target.value;

    if( this.searchForPostsContentString.length > 0 ) {

      this.arrayOfIds = new Array();

      let searchPostsUsingContent = this.http.get('http://localhost:3000/person/searchPostsUsingTitle/'+this.friendEmailId+"/"+this.searchForPostsContentString);
      searchPostsUsingContent.subscribe((data:any) =>
          {
            console.log("searchPostsUsingContent "+data.error);

            if( data.error == false ) {
              this.arrayOfIds = data.userModel.map(a => a._id).reverse() ;
            }

          });

    }
    else {

      this.postsMadeByThisUserMethod();

    }

  }

}
