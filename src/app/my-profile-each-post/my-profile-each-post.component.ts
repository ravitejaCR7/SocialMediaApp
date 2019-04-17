import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-profile-each-post',
  templateUrl: './my-profile-each-post.component.html',
  styleUrls: ['./my-profile-each-post.component.css']
})
export class MyProfileEachPostComponent implements OnInit {

  @Input() userId:string;

  datePosted:Date;
  postTexted:string = "";
  imgOrVid:string = "";

  videoSource:any;

  imageFlag:boolean = false;
  videoFlag:boolean = false;

  constructor(private http: HttpClient , private router: Router) { }

  ngOnInit() {
    console.log("id is "+this.userId);

    let obs = this.http.get('http://localhost:3000/person/getThisPost/'+this.userId);
    obs.subscribe((data:any) =>
        {
          console.log("search child response : "+data);

          this.datePosted = data.userModel.datePosted;
          this.postTexted = data.userModel.textEntered;
          if(data.userModel.postImageOrVideo.endsWith(".JPG") || data.userModel.postImageOrVideo.endsWith(".jpg") || data.userModel.postImageOrVideo.endsWith(".png"))
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
        });

  }

}
