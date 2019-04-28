import { Component,Input , OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-notification-comments-each-child',
  templateUrl: './notification-comments-each-child.component.html',
  styleUrls: ['./notification-comments-each-child.component.css']
})
export class NotificationCommentsEachChildComponent implements OnInit {

  @Input() commentId:string;

  senderName:String;
  serverResponse:String;
  showButtons:boolean = true;

  constructor( private http: HttpClient ) { }

  ngOnInit() {

    //getting this comment details
    let obsthisCommentDetails = this.http.get('http://localhost:3000/person/thisCommentDetails/'+this.commentId);
    obsthisCommentDetails.subscribe((data:any) =>
        {

          this.senderName = data.commentedByEmail;

        });

  }

  acceptComment(){
    //change the comment status to 2
    let obsthisCommentDetails = this.http.get('http://localhost:3000/person/isCommentableStausChange/'+this.commentId+"/"+2);
    obsthisCommentDetails.subscribe((data:any) =>
        {

          if(data.res == 1){
            this.serverResponse = "Your friend can now comment on this post";
            this.showButtons = false;
          }
          else{
            this.serverResponse = "error! check the frontend and serve side logs";
          }

        });
  }

  rejectComment(){
    //change the comment status to 3
    let obsthisCommentDetails = this.http.get('http://localhost:3000/person/isCommentableStausChange/'+this.commentId+"/"+3);
    obsthisCommentDetails.subscribe((data:any) =>
        {

          if(data.res == 1){
            this.serverResponse = "Your friend cannot comment on this post";
            this.showButtons = false;
          }
          else{
            this.serverResponse = "error! check the frontend and serve side logs";
          }

        });
  }

}
