import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PrimaryKeyServiceService } from '../primary-key-service.service';


@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {
selectedPrivacySettings: String = '';
userPrimaryKey:string="";
userPrimaryMailId:string="";

errorFlag:boolean = false;

privacyList: any = [
  'Public',
  'Private',
  'Friends',
  'Friends of friends'
];

constructor(private http: HttpClient , private router: Router, private primaryKeyService: PrimaryKeyServiceService)
{
}

  ngOnInit() {
    this.userPrimaryKey = this.primaryKeyService.getPrimaryKey();

    let obs = this.http.get('http://localhost:3000/person/userInfo/'+this.userPrimaryKey);
    obs.subscribe((data:any) =>
        {

          this.userPrimaryMailId = data.email;

          console.log("privacy key mail "+this.userPrimaryMailId);
        });
  }

  privacyChangedHandler(event: any){
    this.selectedPrivacySettings = event.target.value;
    console.log(this.selectedPrivacySettings);
    console.log("privacy key"+this.userPrimaryKey);
  }

  privacyChange()
  {
    if(this.userPrimaryMailId.length > 0 && this.selectedPrivacySettings.length > 0)
    {
      //send the new privacy value
      let obs = this.http.put('http://localhost:3000/person/privacySettingsChange/'+this.userPrimaryMailId,
      {
        "email":this.userPrimaryMailId,
        "privacy":this.selectedPrivacySettings
      }
      );
      obs.subscribe((data:any) =>
          {
            console.log("successfully changed the privacy settings ");
            this.router.navigate(['/landing']);
          }
        );
    }
    else
    {
      //error with the email API
      this.errorFlag = true;
    }
  }

}
