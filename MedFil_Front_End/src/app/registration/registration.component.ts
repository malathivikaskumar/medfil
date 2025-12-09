import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router, RouterState} from "@angular/router";
import {Location} from "@angular/common";
import {UserDetails} from "../../UserDetails";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RegistrationService} from "./registration.service";
import {Msg} from "../Msg";
import {ShopDetails} from "../../ShopDetails";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user : UserDetails = new UserDetails();
  msg : Msg = new Msg();
  shop :ShopDetails = new ShopDetails();
  constructor(private route: ActivatedRoute, private service : RegistrationService) { }

  isUser:boolean= false;
  successMsg: string = '';
  errorMsg: string = '';
  registration: any = null;
  shopForm: any = null;
  ngOnInit(): void {
    this.route.data.subscribe(value => {
        this.isUser = value['isUser'];

        console.log(this.isUser)
    });

    this.registration = new FormGroup({
      firstName : new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]),
      lastname : new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]),
      userEmail : new FormControl('',[Validators.required,Validators.email]),
      userPassword : new FormControl('',[Validators.required, Validators.minLength(4),Validators.maxLength(10)]),
      confirmpassword : new FormControl(),
      checkbox : new FormControl('',[Validators.required]),
    });
    this.shopForm = new FormGroup({
      shopname : new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]),
      address : new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]),
      town : new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
      district : new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
      state : new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
      country : new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
      pincode : new FormControl('',[Validators.required]),

      }
    )
  }

  //controls for validating form
  get registerFormControl() {
    return this.registration.controls;
  }
  //controls for validating form
  get shopFormControl() {
    return this.shopForm.controls;
  }

  registerUser()
  {
    this.successMsg = '';
    this.errorMsg= '';

    this.user.firstName = this.registration.value.firstName;
    this.user.lastname = this.registration.value.lastname;
    this.user.userEmail = this.registration.value.userEmail;
    this.user.userPassword = this.registration.value.userPassword;
    this.user.confirmpassword = this.registration.value.confirmpassword;

    if(this.user.userPassword !== this.user.confirmpassword){
      this.errorMsg = 'Password Not Matched';
      return;

    }
    if(!this.isUser)
    {
      console.log(this.shopForm.value)
      this.shop.shopName = this.shopForm.value.shopname;
      this.shop.address = this.shopForm.value.address;
      this.shop.town = this.shopForm.value.town;
      this.shop.district = this.shopForm.value.district;
      this.shop.state = this.shopForm.value.state;
      this.shop.country = this.shopForm.value.country;
      this.shop.pincode = this.shopForm.value.pincode;

      this.user.shopDetails = this.shop;

      console.log(this.user.shopDetails)
    }

    this.service.registration(this.user).subscribe(value => {
      console.log(value);
      this.msg = <Msg>value;

      if(this.msg.errorMsg!==null && this.msg.errorMsg.length>0){
        this.errorMsg = this.msg.errorMsg;
      }else{
        this.successMsg = this.msg.successMsg;
        this.registration.reset();
        this.shopForm.reset();
      }

    })

  }



}
