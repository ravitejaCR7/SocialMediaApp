import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PrimaryKeyServiceService } from '../primary-key-service.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  errorMessage:string = "";
  errorFlag:boolean = false;

  emailid:string = "";
  password:string = "";
  constructor( private http: HttpClient , private router: Router , private primaryKeyService: PrimaryKeyServiceService ) {
   }

  ngOnInit() {
   this.errorFlag = false;
  }

  loginInputForEmail(event:any)
  {
    this.emailid = event.target.value;
  }

  loginInputForPassword(event:any)
  {
    this.password = event.target.value;
  }


  loginButtonClick()
  {
    this.errorFlag = false;
    console.log(this.errorMessage);
    console.log('email : ' + this.emailid);
    console.log('password : ' + this.password);

    let obs = this.http.get('http://localhost:3000/person/loginCheck/' + this.emailid + '/' + this.password);
    obs.subscribe((data: any) => {
          console.log('login error response : ' + data.error);
          if(data.error == false) {
            // no error
            console.log('login id : ' + data.userModel._id);

            if(this.emailid === "admin@gmail.com") {
              this.primaryKeyService.setIsAdmin(true);
            }
            else {
              this.primaryKeyService.setIsAdmin(false);
            }

            this.errorFlag = false;
            this.primaryKeyService.setPrimaryKey(data.userModel._id);
            this.primaryKeyService.setEmailId(data.userModel.email);

            console.log('login id issss: ' + this.primaryKeyService.getPrimaryKey());
            this.router.navigate(['/landing']);
          } else {
            // Invalid login
            this.errorFlag = true;
            this.errorMessage = 'Invalid login credentials'
          }
        });
  }

}
