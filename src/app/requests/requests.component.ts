import {Component, Input, OnInit} from '@angular/core';
import {PrimaryKeyServiceService} from "../primary-key-service.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  @Input() email:string;
  name: string;
  accepted: string = '1';
  response: boolean = true;

  public requests:{ name: String, email: String }[] = [];

  constructor(private http: HttpClient, private router: Router, private primaryKeyService: PrimaryKeyServiceService) {
  }

  ngOnInit() {
    let obs = this.http.get('http://localhost:3000/person/specificUserInfo/' + this.email);
    obs.subscribe((data: any) => {
      this.name = data.userModel.name;
    });
  }

  respond($event) {
    console.log("On event");
    if($event.target.value == "yes") {
      const obs = this.http.get('http://localhost:3000/person/acceptingFriendRequest/' + this.primaryKeyService.getEmailId() + '/' + this.email);
      obs.subscribe((data: any) => {
        console.log("navigated yes");
        this.accepted = '2';
        this.ngOnInit();

      });
    } else {
      console.log("Decline");
      const obs = this.http.get('http://localhost:3000/person/cancelNotificationOrRequest/' + this.email + '/' + this.primaryKeyService.getEmailId());
      obs.subscribe((data: any) => {
        console.log("navigated no");
        this.response = false;
        this.ngOnInit();
      });
    }

  }


  removeFriend($event) {
    if($event.target.value == "0") {
      const obs = this.http.get('http://localhost:3000/person/removeFriend/' + this.primaryKeyService.getEmailId() + '/' + this.email);
      obs.subscribe((data: any) => {
        this.response = false;
        this.ngOnInit();
      });
    }
  }
}
