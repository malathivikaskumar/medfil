import { Component, OnInit } from '@angular/core';
import {UserDetails} from "../../UserDetails";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "./login.service";
import {Msg} from "../Msg";
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";
import {Router} from "@angular/router";
import {MainService} from "../main.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user : UserDetails = new UserDetails();
  msg : Msg = new Msg();
  errormsg : string = '';

  constructor(private service : LoginService,
              private socialAuthService: SocialAuthService,
              private route: Router,
              private mainService: MainService) { }
  loginForm : any = null;
  socialUser: SocialUser = new SocialUser();
  ngOnInit(): void {
   this.loginForm = new FormGroup({
     email : new FormControl(),
     password : new FormControl()

   })
  }
  loginUser()
  {
    this.errormsg = '';
    this.user.userEmail = this.loginForm.value.email;
    this.user.userPassword = this.loginForm.value.password;
    //console.log(this.user);
    this.service.login(this.user).subscribe(value => {
        console.log(value);
        this.msg = <Msg>value;
        if(this.msg.errorMsg !== null && this.msg.errorMsg.length >0)
        {
           this.errormsg = this.msg.errorMsg;
        }else{
            console.log(this.msg.userDetails);
            this.mainService.changeUserDetails(<UserDetails>this.msg.userDetails);
            if(this.msg.userDetails?.merchant){
              this.route.navigateByUrl("medfill/user-home/view-shops");
            }else{
              this.route.navigateByUrl("medfill/user-home/searchmedicine");
            }
        }
      }, error => {
        this.errormsg = "service error";
    });

  }
  loginwithgoogle()
  {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}
