import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
// emailid:string = "";
// password:string = "";
  constructor() {
   }

  ngOnInit() {
    $(document).ready(function(){
      $("#submit").click(function(){
        console.log($("#loginemail").val());
        var emailid = $("#loginemail").val();
        var password = $("#loginpassword").val();
      })


    });
  }

}
