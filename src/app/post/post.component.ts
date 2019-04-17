import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PrimaryKeyServiceService } from '../primary-key-service.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  content: string = "";
  selectedImageOrVideo:File = null;
  commentableFlag:boolean;
  commentable:string = "";
  userPrimaryKey = "";
  userPrimaryMailId:string="";

  constructor(private http: HttpClient , private router: Router, private primaryKeyService: PrimaryKeyServiceService)
  {
  }

  ngOnInit() {
    this.userPrimaryKey = this.primaryKeyService.getPrimaryKey();
    console.log("key in post : "+this.userPrimaryKey);

    let obs = this.http.get('http://localhost:3000/person/userInfo/'+this.userPrimaryKey);
    obs.subscribe((data:any) =>
        {

          this.userPrimaryMailId = data.email;

          console.log("privacy key mail in post module "+this.userPrimaryMailId);
        });
  }

posttext(event:any){
  this.content = event.target.value;
}

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
  console.log("text: "+this.content);
  console.log("image: "+this.selectedImageOrVideo);
  console.log("radio: "+this.commentableFlag);

  const fd = new FormData();
  fd.append("email", this.userPrimaryMailId);
  fd.append("datePosted", ""+new Date());
  fd.append("textEntered", this.content);
  fd.append("postImageOrVideo", this.selectedImageOrVideo);
  fd.append("isCommentable", ""+this.commentableFlag);

  let obs = this.http.post('http://localhost:3000/person/postedByThisUser', fd);
  obs.subscribe((data:any) => {
    console.log(data);
    },
    (err:any) => {
        console.log(err);
    });

}
}
