import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PrimaryKeyServiceService } from '../primary-key-service.service';

@Component({
  selector: 'app-my-profile-each-post',
  templateUrl: './my-profile-each-post.component.html',
  styleUrls: ['./my-profile-each-post.component.css']
})
export class MyProfileEachPostComponent implements OnInit {
  //userId here is the postId
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


  constructor(private http: HttpClient , private router: Router,  private primaryKeyService: PrimaryKeyServiceService) { }

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
          if( data.userModel.isCommentable == true ){
            //requestComments = false;
            this.requestComments = false;
          }
          else{
            this.requestComments = true;
          }
        });

  }

  onCommentTextEntered(event:any)
  {
    this.newCommentText = event.target.value;
  }

  onImageUpload(event:any)
  {
    console.log("selected img : "+event.target.files[0]);
    this.selectedImageOrVideo = event.target.files[0];
  }

  openComments()
  {
    if(this.showCommentsFlag == false)
    {
      //show comments
      this.showCommentsFlag = true;
      let obsGettingAllCommentsOnThisPost = this.http.get('http://localhost:3000/person/commentsOnThisPostGet/'+this.userId);
      obsGettingAllCommentsOnThisPost.subscribe((data:any) =>
          {
            console.log("search child response : "+data);

            this.commentIdArray = new Array();
            this.commentIdArray = data.userModel.map(a => a._id).reverse();

            if(this.commentIdArray.length > 0)
            {
              //there are few comments which has to be loaded in child views
              this.showCommentsFlag = true;
            }

          });
    }
    else
    {
      //hide comments
      this.showCommentsFlag = false;
      this.commentIdArray = new Array();
    }

  }

  postNewComment()
  {
    console.log("selected img : "+this.selectedImageOrVideo);
    if(this.newCommentText.length > 0 || this.selectedImageOrVideo != null)
    {
      const fd = new FormData();
      fd.append("postId", this.userId);
      fd.append("commentedEmail", this.userPrimaryMailId);
      fd.append("datePosted", ""+new Date());
      fd.append("textEntered", this.newCommentText);
      fd.append("commentImageOrVideo", this.selectedImageOrVideo);

      let obs = this.http.post('http://localhost:3000/person/commentsOnThisPost', fd);
      obs.subscribe((data:any) => {
        console.log(data);
        },
        (err:any) => {
            console.log(err);
        });

    }


  }

}
