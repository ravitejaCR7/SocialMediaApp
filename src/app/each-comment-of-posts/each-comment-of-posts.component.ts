import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-each-comment-of-posts',
  templateUrl: './each-comment-of-posts.component.html',
  styleUrls: ['./each-comment-of-posts.component.css']
})
export class EachCommentOfPostsComponent implements OnInit {

  postTexted:string = "";

  imageFlag:boolean = false;
  videoFlag:boolean = false;

  imgOrVid:string = "";
  videoSource:any;

  @Input() eachCommentId:string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    console.log("each comment ID is : "+this.eachCommentId);

    //getting each comment's details
    let obs = this.http.get('http://localhost:3000/person/getThisComment/'+this.eachCommentId);
    obs.subscribe((data:any) =>
        {
          this.postTexted = data.userModel.textEntered;
          if( data.userModel.postImageOrVideo != null )
          {
            if(data.userModel.postImageOrVideo.endsWith(".jpeg") || data.userModel.postImageOrVideo.endsWith(".JPG") || data.userModel.postImageOrVideo.endsWith(".jpg")|| data.userModel.postImageOrVideo.endsWith(".PNG") || data.userModel.postImageOrVideo.endsWith(".png"))
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
