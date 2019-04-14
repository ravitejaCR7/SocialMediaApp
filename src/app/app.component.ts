import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as $ from 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SocialMediaApp';

  constructor( private router: Router )
    {
    }

  ngOnInit(){
    this.router.navigate(['/login']);
    $('#btn').click(function(){
      alert('hello');
    });
  }
}
