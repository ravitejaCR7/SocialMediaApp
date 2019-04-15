import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PrimaryKeyServiceService } from '../primary-key-service.service';

@Component({
  selector: 'app-search-each-child',
  templateUrl: './search-each-child.component.html',
  styleUrls: ['./search-each-child.component.css']
})
export class SearchEachChildComponent implements OnInit {

  @Input() userId:string;

  userName:string = "";

  constructor(private http: HttpClient , private router: Router, private primaryKeyService: PrimaryKeyServiceService) { }

  ngOnInit() {

    let obs = this.http.get('http://localhost:3000/person/specificUserInfo/'+this.userId);
    obs.subscribe((data:any) =>
        {

          // console.log("search child response : "+data.userModel.map(a => a._id));
          console.log("search child response : "+data);
          this.userName = data.userModel.name;
        });

  }

  profileLink()
  {
    this.router.navigate(['friendAccount']);
  }
}
