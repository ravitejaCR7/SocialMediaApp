import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-registration-user',
  templateUrl: './registration-user.component.html',
  styleUrls: ['./registration-user.component.css']
})
export class RegistrationUserComponent implements OnInit {

  errorMessage: string = "";

  emailId:string = "";
  password:string = "";
  fullName:string = "";
  address:string = "";
  selectedImage:File = null;


  errorFlag:boolean = false;

  constructor(private http: HttpClient , private router: Router)
  {
  }

  ngOnInit() {
    this.errorFlag = false;

  $(document).ready(function() {
  	$("#username").focus(function(){

  		 $("#username + span").hide();
  		$("#username + span").addClass("info");
  	})
  	$("#username").focusout(function(){
  		if($("#username").val().length != 0){
  		if(/^[a-zA-Z0-9]+$/.test($("#username").val())){
  			$("#username + span").removeClass("info");
  			$("#username + span").html("<span style='font-size:20px; color:#fff'>&#9989;</span>");
  				$("#username + span").addClass("<span style='font-size:20px; color:#fff'>&#9989;</span>");
  	}
  		else{
  			$("#username +span").text("Invalid Username");
  				$("#username +span").addClass("error");
  		}
  	}
  	else
  		$("#username + span").hide();
  	})
  	$("#userpassword").focus(function(){

  		$("#userpassword+span").hide();
  		$("#userpassword").after("<span></span>");
  		$("#userpassword + span").addClass("info");
  	})
  	$("#userpassword").focusout(function(){
  		if($("#userpassword").val().length != 0){
  		if(($("#userpassword").val().length > 7)){
  			$("#userpassword + span").removeClass("info");
  			$("#userpassword + span").html("<span style='font-size:20px; color:#fff'>&#9989;</span>");
  				$("#userpassword + span").addClass("<span style='font-size:20px; color:#fff'>&#9989;</span>");
  	}
  		else{
  			$("#userpassword + span").text("Error");
  				$("#userpassword + span").addClass("error");
  		}
  	}
  	else
  		$("#userpassword+span").hide();
  	});
    $("#userconfirmpassword").focus(function(){
      $("#userconfirmpassword + span").hide();
      $("#userconfirmpassword").after("<span>This should match with password</span>")
      $("#userconfirmpassword + span").addClass("info");
    })
    $("#userconfirmpassword").focusout(function(){
      if($("#userconfirmpassword").val().length !=0){
        if(($("#userpassword").val().length > 7)){
        if($("#userpassword").val() == $("#userconfirmpassword").val()){
          $("#userconfirmpassword + span").removeClass("info");
    			$("#userconfirmpassword + span").html("<span style='font-size:20px; color:#fff'>&#9989;</span>");
    			$("#userconfirmpassword + span").addClass("<span style='font-size:20px; color:#fff'>&#9989;</span>");
        }
      }
        else{
    			$("#userconfirmpassword + span").text("Passwords donot match");
    			$("#userconfirmpassword + span").addClass("error");
    		}
      }
      else
    		$("#userconfirmpassword+span").hide();
    });
  $("#useremail").focus(function(){

  		$("#useremail+span").hide();
  		$("#useremail").after("<span> example@email.com </span>");
  		$("#useremail + span").addClass("info");
  	})
  	$("#useremail").focusout(function(){
  		if($("#useremail").val().length != 0){
  		if(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test($("#useremail").val())){
  			$("#useremail + span").removeClass("info");
  			$("#useremail + span").html("<span style='font-size:20px; color:#fff'>&#9989;</span>");
  				$("#useremail + span").addClass("<span style='font-size:20px; color:#fff'>&#9989;</span>");
  	}
  		else{
  			$("#useremail + span").text("Invalid");
  				$("#useremail + span").addClass("error");
  		}
  	}
  	else
  		$("#useremail+span").hide();

  	});
  });

  }


  registrationInputForFullName(event:any)
  {
    this.fullName = event.target.value;
  }

  registrationInputForEmail(event:any)
  {
    this.emailId = event.target.value;
  }

  registrationInputForPassword(event:any)
  {
    this.password = event.target.value;
  }

  onImageUpload(event:any)
  {
    console.log(event);
    this.selectedImage = event.target.files[0];
  }

  validateRegistration()
  {
    console.log("errorMessage "+this.errorMessage);
    console.log("emailId "+this.emailId);
    console.log("password "+this.password);
    console.log("fullName "+this.fullName);
    console.log("address "+this.address);
    console.log("pic "+this.selectedImage.name);
    console.log("errorFlag "+this.errorFlag);

    const fd = new FormData();
    fd.append("name", this.fullName);
    fd.append("address", "McCallum");
    fd.append("dateOfBirth", "04/15/1995");
    fd.append("email", this.emailId);
    fd.append("password", this.password);
    fd.append("personPic", this.selectedImage);

    let obs = this.http.post('http://localhost:3000/person/newUserCreation', fd);
    obs.subscribe((data:any) => {
      console.log(data);

      if(data.error == false)
      {
        console.log("routing here");
        this.router.navigate(['/login']);
      }
      else
      {
        console.log("error creating the user");
      }

      },
      (err:any) => {
          console.log(err);
      });


    let obs1 = this.http.post('http://localhost:3000/person/privacySettingsCreate',
    {
      "email":this.emailId,
      "privacy":"public"
    }
    );
    obs1.subscribe((data:any) => {
        console.log("successfully inserted the privacy settings ");
      },
      (err:any) => {
        console.log("failed to insert the privacy settings ");
      }
      );

  }
}
