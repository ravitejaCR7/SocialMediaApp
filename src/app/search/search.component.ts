import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PrimaryKeyServiceService } from '../primary-key-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  errorMessage: string = "";

  searchName:string = "";
  arrayOfIds:string[];

  errorPresent:boolean = false;

  searchForThisUserFlag:boolean = false;

  constructor(private http: HttpClient , private router: Router, private primaryKeyService: PrimaryKeyServiceService)
  {
  }

  ngOnInit() {
    this.errorPresent = false;
  }

  searchForThisUsers(event:any)
  {
    this.searchName = event.target.value;

    if(this.searchName.length > 0)
    {
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
              this.errorMessage = "No users found";
              this.errorPresent = true;
            }
            else
            {
              this.errorPresent = false;
              this.errorMessage = "";
            }
            // console.log("array "+this.arrayOfIds);
          });
    }
  }

}
