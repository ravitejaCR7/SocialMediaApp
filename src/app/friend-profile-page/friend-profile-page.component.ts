import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-friend-profile-page',
  templateUrl: './friend-profile-page.component.html',
  styleUrls: ['./friend-profile-page.component.css']
})
export class FriendProfilePageComponent implements OnInit {

  constructor( private route: ActivatedRoute ) { }

  ngOnInit() {
    let friendEmailId = this.route.snapshot.paramMap.get('id');
    console.log("asdasd : "+friendEmailId);
  }

}
