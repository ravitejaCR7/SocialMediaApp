import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PrimaryKeyServiceService } from '../primary-key-service.service';
import { FriendPrimaryKeyService } from '../friend-primary-key.service';

@Component({
  selector: 'app-my-profile-each-post-random',
  templateUrl: './my-profile-each-post-random.component.html',
  styleUrls: ['./my-profile-each-post-random.component.css']
})
export class MyProfileEachPostRandomComponent implements OnInit {

  @Input() userId:string;

  datePosted:Date;
  postTexted:string = "";
  imgOrVid:string = "";

  videoSource:any;

  imageFlag:boolean = false;
  videoFlag:boolean = false;

  userPrimaryKey = "";
  userPrimaryMailId:string="";

  showCommentsFlag:boolean = false;
  commentIdArray:string[];

  newCommentText:string = "";
  selectedImageOrVideo:File = null;

  requestComments:boolean = false;

  serverResponseFlag:boolean = false;
  serverResponse:String = "";

  constructor(private http: HttpClient , private router: Router,  private primaryKeyService: PrimaryKeyServiceService, private friendPrimaryKeyService: FriendPrimaryKeyService) { }

  ngOnInit() {
    console.log("id of each post "+this.userId);

    this.userPrimaryKey = this.primaryKeyService.getPrimaryKey();


    //getting the user email to use it in post request
    let obsToGetTheUserEmail = this.http.get('http://localhost:3000/person/userInfo/'+this.userPrimaryKey);
    obsToGetTheUserEmail.subscribe((data:any) =>
        {

          this.userPrimaryMailId = data.email;

        });

    //getting the post details
    let obs = this.http.get('http://localhost:3000/person/getThisPost/'+this.userId);
    obs.subscribe((data:any) =>
        {
          console.log("search child response : "+data);

          this.datePosted = data.userModel.datePosted;
          this.postTexted = data.userModel.textEntered;
          if( data.userModel.postImageOrVideo != null )
          {
            if(data.userModel.postImageOrVideo.endsWith(".JPG") || data.userModel.postImageOrVideo.endsWith(".jpg") || data.userModel.postImageOrVideo.endsWith(".png") || data.userModel.postImageOrVideo.endsWith(".PNG") || data.userModel.postImageOrVideo.endsWith(".jpeg") )
            {
              console.log("Image ...");
              this.imageFlag = true;
              this.imgOrVid = "http://localhost:3000/PostsBinaryData/"+data.userModel.postImageOrVideo;
            }
            if(data.userModel.postImageOrVideo.endsWith(".mp4"))
            {
              console.log("video ...");
              this.videoFlag = true;
              this.videoSource = "http://localhost:3000/PostsBinaryData/"+data.userModel.postImageOrVideo;
            }
          }

        });

  }

}
