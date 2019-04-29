import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PrimaryKeyServiceService } from '../primary-key-service.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  errorMessage: string = "";

  searchName:string = "";
  arrayOfIds:string[];
  thisUsersName:String;
  errorPresent:boolean = false;

  searchForThisUserFlag:boolean = false;
  primaryKey:string="";

  profilePicture:String;

  //isAdminFlags
  isAdmin:boolean = false;

  constructor( private http: HttpClient , private router: Router , private primaryKeyService: PrimaryKeyServiceService ) {
   }

  ngOnInit() {
    this.primaryKey = this.primaryKeyService.getPrimaryKey();

    this.isAdmin = this.primaryKeyService.getIsAdmin();
    console.log("@@@ADmin : "+this.isAdmin);

    this.router.navigate(['../landing/myProfilePage']);

    let obs = this.http.get('http://localhost:3000/person/specificUserInfo/' + this.primaryKeyService.getEmailId());
    obs.subscribe((data: any) => {
      this.thisUsersName = data.userModel.name;
      if (data.userModel.personPic != null) {
        if (data.userModel.personPic.endsWith('.JPG') || data.userModel.personPic.endsWith('.jpg') || data.userModel.personPic.endsWith('.png')) {
          console.log('Image ...' + 'http://localhost:3000/uploads/' + data.userModel.personPic);
          this.profilePicture = 'http://localhost:3000/uploads/' + data.userModel.personPic;
        } else {
          this.profilePicture = 'http://localhost:3000/uploads/default.jpeg';
        }
      }

    });


  }

// search Box

  searchForThisUsers(event:any)
  {
    this.searchName = event.target.value;

    if (this.searchName.length > 0) {
      console.log(this.searchName);
      let obs = this.http.get('http://localhost:3000/person/searchName/'+this.searchName);
      obs.subscribe((data:any) =>
          {
            // console.log("search error response : "+data.error);
            // console.log("search response : "+data.userModel.map(a => a._id));
            this.arrayOfIds = new Array();
            this.arrayOfIds = data.userModel.map(a => a.email) ;
            console.log(" length  "+data.userModel.length);
            if(data.userModel.length < 1)
            {
              //no users found
              this.errorMessage = "User not found";
              this.errorPresent = true;

            }
            else
            {
              this.errorPresent = false;
              this.errorMessage = "";
            }
            console.log("array "+this.arrayOfIds);
          });
    }
    else{
      this.errorPresent = false;
      this.errorMessage = "";
      this.arrayOfIds = new Array();
    }

  }

  notify11(mwss:String){
    console.log("from parent : ");
    console.log("from parent : "+mwss);
  }

}
