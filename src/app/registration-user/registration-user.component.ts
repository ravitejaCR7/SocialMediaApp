import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
   { }

  ngOnInit() {
    this.errorFlag = false;
  }


  registrationInputForFullName(event:any)
  {
    this.fullName = event.target.value;
  }

  registrationInputForEmail(event:any)
  {
    this.password = event.target.value;
  }

  registrationInputForPassword(event:any)
  {
    this.emailId = event.target.value;
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

    //http://localhost:8080/restproject/webapi/products/newClientCreation/

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
      } ,
      (err:any) => {
          console.log(err);
      });
  }

}
