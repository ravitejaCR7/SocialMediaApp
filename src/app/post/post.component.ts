import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  content: string = "";
  selectedImage:File = null;
  // flag:boolean = true;
  commentable:string = "";
  constructor() { }

  ngOnInit() {
  }
posttext(event:any){
  this.content = event.target.value;
}
onImageUpload(event:any)
{
  console.log(event);
  this.selectedImage = event.target.files[0];
}
isCommentable(event:any){
  this.commentable = event.target.value;
  console.log(this.commentable);
}
postcontent(){
  console.log(this.content);
  console.log("im from here");
  console.log(this.selectedImage);
}
}
