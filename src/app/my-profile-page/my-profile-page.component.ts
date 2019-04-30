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

  content: string = "";
  selectedImageOrVideo:File = null;
  commentableFlag:boolean = true;
  commentable:string = "";

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

    this.childPostsCreateMethod();

  }

  childPostsCreateMethod(){
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
                this.arrayOfIds = data.userModel.map(a => a._id).reverse() ;
                console.log(" length  "+this.arrayOfIds);

              });
        });

  }

  // posttext(event:any){
  //   this.content = event.target.value;
  // }

  onImageUpload(event:any)
  {
    console.log(event);
    this.selectedImageOrVideo = event.target.files[0];
  }

  radioCommentType(event:any){
    this.commentable = event.target.value;
    console.log(this.commentable);

    if(this.commentable == "yes")
      this.commentableFlag = true;
    else
      this.commentableFlag = false;
  }

  postcontent(){

    console.log("text11: "+this.content);
    console.log("image11: "+this.selectedImageOrVideo);
    console.log("radio11: "+this.commentableFlag);

    const fd = new FormData();
    fd.append("email", this.userPrimaryMailId);
    fd.append("datePosted", ""+new Date());
    fd.append("textEntered", this.content);
    fd.append("postImageOrVideo", this.selectedImageOrVideo);
    fd.append("isCommentable", ""+this.commentableFlag);

    let obs = this.http.post('http://localhost:3000/person/postedByThisUser', fd);
    obs.subscribe((data:any) => {
      this.content="";
      this.selectedImageOrVideo=null;
      console.log(data);
      this.childPostsCreateMethod();
      },
      (err:any) => {
          console.log(err);
      });

  }

}
