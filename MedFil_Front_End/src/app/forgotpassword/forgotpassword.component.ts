import { Component, OnInit } from '@angular/core';
import {UserDetails} from "../../UserDetails";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "./forgotpassword.service";
import {Msg} from "../Msg";
import {Router} from "@angular/router";
import {MainService} from "../main.service";

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  user : UserDetails = new UserDetails();
  msg : Msg = new Msg();
  errormsg : string = '';
  successMsg: string = '';
  errorMsg: string = '';
  
  constructor(private service : LoginService,
              private route: Router,
              private mainService: MainService) { }

  forgotPassword: any = null;
  ngOnInit(): void {

    this.forgotPassword = new FormGroup({
      userEmail : new FormControl('',[Validators.required,Validators.email]),
      userPassword : new FormControl('',[Validators.required, Validators.minLength(4),Validators.maxLength(10)]),
      confirmpassword : new FormControl(),
    });
  }

  get registerFormControl() {
    return this.forgotPassword.controls;
  }

  resetPassword()
  {
    this.successMsg = '';
    this.errorMsg= '';
    this.user.userEmail = this.forgotPassword.value.userEmail;
    this.user.userPassword = this.forgotPassword.value.userPassword;
    this.user.confirmpassword = this.forgotPassword.value.confirmpassword;
    console.log(this.user.userPassword);
    console.log(this.user.confirmpassword);
    if(this.user.userPassword !== this.user.confirmpassword){
      this.errorMsg = 'Password Not Matched';
      return; 
    }
    //console.log(this.user);
    this.service.resetpassword(this.user).subscribe(value => {
        console.log(value);
        this.msg = <Msg>value;
        if(this.msg.errorMsg !== null && this.msg.errorMsg.length >0)
        {
           this.errormsg = this.msg.errorMsg;
        }else{
          this.successMsg = this.msg.successMsg;
        }
        this.forgotPassword.reset();
      }, error => {
        this.errormsg = "service error";
    });

  }

}
