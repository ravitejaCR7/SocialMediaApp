import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PrimaryKeyServiceService } from '../primary-key-service.service';


@Component({
  selector: 'app-message-each-child',
  templateUrl: './message-each-child.component.html',
  styleUrls: ['./message-each-child.component.css']
})
export class MessageEachChildComponent implements OnInit {

  @Input() userId:string;

  userName: string = '';

  constructor(private http: HttpClient , private router: Router, private primaryKeyService: PrimaryKeyServiceService) { }

  ngOnInit() {

    let obs = this.http.get('http://localhost:3000/person/specificUserInfo/' + this.userId);
    obs.subscribe((data: any) => {

          // console.log("search child response : "+data.userModel.map(a => a._id));
          console.log('search child response : ' + data);
          this.userName = data.userModel.name;
        });

  }

  testing()
  {
    console.log("testing");
    // [routerLink] = "['../messaging/socketmessenger',userId]"
    this.router.navigate(['../landing/messaging/socketmessenger',this.userId]);
  }

}
