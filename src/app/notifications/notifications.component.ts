import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PrimaryKeyServiceService } from '../primary-key-service.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  arrayOfCommentObjs:string[];

  constructor( private http: HttpClient, private primaryKeyService: PrimaryKeyServiceService ) { }

  ngOnInit() {

    let obsToGetAllCommentsNotifications = this.http.get('http://localhost:3000/person/commentsNotifications/'+this.primaryKeyService.getEmailId());
    obsToGetAllCommentsNotifications.subscribe((data:any) =>
        {

          this.arrayOfCommentObjs = new Array();
          this.arrayOfCommentObjs = data.userModel.map(a => a._id) ;
          console.log(" lengthof comments  "+this.arrayOfCommentObjs.length);

        });

  }

}
