import { Component, OnInit } from '@angular/core';
//import {} from '@angular/core/src/metadata/lifecycle_hooks';
import * as $ from 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SocialMediaApp';
  ngOnInit(){
    $('#btn').click(function(){
      alert('hello');
    });
  }
}
