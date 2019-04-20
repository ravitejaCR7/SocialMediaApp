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

  errorFlag: boolean = false;

  constructor(private http: HttpClient , private router: Router) {
  }

  ngOnInit() {
    this.errorFlag = false;

<<<<<<< HEAD
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
=======
    function strongPasswordCheck(input: any) {
      let alphaNumCheck = false, lowercaseCheck = false, uppercaseCheck = false, numberCheck = false;

      for ( let i = 0; i < input.length; i++) {
        if (input.charAt(i) >= 'A' && input.charAt(i) <= 'Z') {
          uppercaseCheck = true;
        } else if (input.charAt(i) >= 'a' && input.charAt(i) <= 'z') {
          lowercaseCheck = true;
        } else if (input.charAt(i) >= '1' && input.charAt(i) <= '9') {
          numberCheck = true;
        } else {
          alphaNumCheck = true;
        }
      }

      let result = '';
      if (!alphaNumCheck) {
        result += '<strong>atleast 1 alphanumeric charcter should be present</strong><br/>';
      }
      if (!numberCheck) {
        result += '<strong>atleast 1 number  should be present</strong><br/>';
      }
      if (!lowercaseCheck) {
        result += '<strong>atleast 1 lower case letter should be present</strong><br/>';
      }
      if (!uppercaseCheck) {
        result  += '<strong>atleast 1 uppper case letter should be present</strong><br/>';
      }
      return result;
    }

    $(document).ready(function() {
  	$('#username').focus(function() {
  		 $('#username + span').hide();
  		 $('#username').after('<span > InfoMessage </span>');
  		 $('#username + span').addClass('info');
  	});
  	$('#username').focusout(function() {
  		if ($('#username').val().length != 0) {
  		if (/^[a-zA-Z0-9]+$/.test($('#username').val())) {
  			$('#username + span').removeClass('info');
  			$('#username + span').text('ok');
  				$('#username + span').addClass('ok');
  	} else {
  			$('#username +span').text('Error');
  				$('#username +span').addClass('error');
  		}
  	} else {
  		$('#username + span').hide();
    }
  	});
  	$('#userpassword').focus(function() {

  		$('#userpassword+span').hide();
  		$('#userpassword').after('<span> InfoMessage </span>');
  		$('#userpassword + span').addClass('info');
  	});
  	$('#userpassword').focusout(function() {
  		if ($('#userpassword').val().length != 0) {
  		if (($('#userpassword').val().length > 7)) {
  		  const error = strongPasswordCheck($('#userpassword').val());
  		  if(error.length == 0) {
          $('#userpassword + span').removeClass('info');
          $('#userpassword + span').text('OK');
          $('#userpassword + span').addClass('ok');
        } else {
          $('#userpassword + span').html(error);
        }

  	} else {
  			$('#userpassword + span').text('Password Should be atleast 8 characters');
  			$('#userpassword + span').addClass('error');
>>>>>>> 4a16b89b1ce7dffdd3cd8e5af56c2c3bef887cdb
  		}
  	} else {
  		$('#userpassword+span').hide();
    }
  	});
<<<<<<< HEAD
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
=======
    $('#userconfirmpassword').focus(function() {
      $('#userconfirmpassword + span').hide();
      $('#userconfirmpassword').after('<span> should match with password</span>');
      $('#userconfirmpassword + span').addClass('info');
    });
    $('#userconfirmpassword').focusout(function() {
      if ($('#userconfirmpassword').val().length != 0) {
        if (($('#userpassword').val().length > 7)) {
        if ($('#userpassword').val() == $('#userconfirmpassword').val()) {
          $('#userconfirmpassword + span').removeClass('info');
    			$('#userconfirmpassword + span').text('OK');
    			$('#userconfirmpassword + span').addClass('ok');
        }
      } else {
    			$('#userconfirmpassword + span').text('Error');
    			$('#userconfirmpassword + span').addClass('error');
>>>>>>> 4a16b89b1ce7dffdd3cd8e5af56c2c3bef887cdb
    		}
      } else {
    		$('#userconfirmpassword+span').hide();
      }
    });
  $('#useremail').focus(function() {

<<<<<<< HEAD
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
=======
  		$('#useremail+span').hide();
  		$('#useremail').after('<span>  example@example.com </span>');
  		$('#useremail + span').addClass('info');
  	});
  	$('#useremail').focusout(function() {
  		if ($('#useremail').val().length != 0) {
  		if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test($('#useremail').val())) {
  			$('#useremail + span').removeClass('info');
  			$('#useremail + span').text('OK');
  				$('#useremail + span').addClass('ok');
  	} else {
  			$('#useremail + span').text('Error');
  				$('#useremail + span').addClass('error');
>>>>>>> 4a16b89b1ce7dffdd3cd8e5af56c2c3bef887cdb
  		}
  	}
  	else
  		$("#useremail+span").hide();

  	});
  });

  }


  registrationInputForFullName(event: any) {
    this.fullName = event.target.value;
  }

  registrationInputForEmail(event: any) {
    this.emailId = event.target.value;
  }

  registrationInputForPassword(event: any) {
    this.password = event.target.value;
  }

  onImageUpload(event: any) {
    console.log(event);
    this.selectedImage = event.target.files[0];
  }


  validateRegistration() {
    console.log('errorMessage ' + this.errorMessage);
    console.log('emailId ' + this.emailId);
    console.log('password ' + this.password);
    console.log('fullName ' + this.fullName);
    console.log('address ' + this.address);
    console.log('pic ' + this.selectedImage.name);
    console.log('errorFlag ' + this.errorFlag);

    const fd = new FormData();
    fd.append('name', this.fullName);
    fd.append('address', 'McCallum');
    fd.append('dateOfBirth', '04/15/1995');
    fd.append('email', this.emailId);
    fd.append('password', this.password);
    fd.append('personPic', this.selectedImage);

    let obs = this.http.post('http://localhost:3000/person/newUserCreation', fd);
    obs.subscribe((data:any) => {
<<<<<<< HEAD
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
=======
        console.log(data);
>>>>>>> 4a16b89b1ce7dffdd3cd8e5af56c2c3bef887cdb

        let obs1 = this.http.post('http://localhost:3000/person/privacySettingsCreate',
          {
            "email":this.emailId,
            "privacy":"public"
          }
        );
        obs1.subscribe((data:any) => {
            console.log("successfully inserted the privacy settings ");



            let obs2 = this.http.get('http://localhost:3000/person/addFriendFirstTime/'+this.emailId);
            obs2.subscribe((data:any) => {
                console.log("successfully inserted the friends table ");
              },
              (err:any) => {
                console.log("failed to insert the privacy settings ");
              }
            );



          },
          (err:any) => {
            console.log("failed to insert the privacy settings ");
          }
        );

      },
      (err:any) => {
        console.log(err);
      });
  }
}
