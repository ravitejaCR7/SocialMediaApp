import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {PrimaryKeyServiceService} from '../primary-key-service.service';

@Component({
  selector: 'app-friend-profile-page',
  templateUrl: './friend-profile-page.component.html',
  styleUrls: ['./friend-profile-page.component.css']
})
export class FriendProfilePageComponent implements OnInit {

  constructor( private route: ActivatedRoute,  private router: Router , private primaryKeyService: PrimaryKeyServiceService) { }

  ngOnInit() {
    let friendEmailId = this.route.snapshot.paramMap.get('id');
    console.log('asdasd : ' + friendEmailId);
    if (this.primaryKeyService.getEmailId() === friendEmailId) {
      this.router.navigate(['/myProfilePage']);
    }
  }

  addFriend() {

  }
}
