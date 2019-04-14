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
  primaryKey:string="";
  constructor( private http: HttpClient , private router: Router , private primaryKeyService: PrimaryKeyServiceService ) {
   }

  ngOnInit() {
    this.primaryKey = this.primaryKeyService.getPrimaryKey();
  }

}
