import { Component, OnInit } from '@angular/core';
import {AddshopsService} from "./addshops.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ShopDetails} from "../../ShopDetails";
import { UserDetails } from 'src/UserDetails';
import { Msg } from '../Msg';
import { MainService } from '../main.service';

@Component({
  selector: 'app-addshops',
  templateUrl: './addshops.component.html',
  styleUrls: ['./addshops.component.css']
})
export class AddshopsComponent implements OnInit {
  shop : ShopDetails = new ShopDetails();
  shopForm: any = null;
  msg : Msg = new Msg();
  userId : number = 0;
  successMsg: string = '';
  errorMsg: string = '';

  constructor(private service: AddshopsService, private mainService: MainService) {}
  ngOnInit(): void {

  this.mainService.userDetails.subscribe(value => {
    this.userId = value.userId;
  });

  this.shopForm = new FormGroup({
    shopName : new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]),
    address : new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]),
    town : new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    district : new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    state : new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    country : new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    pincode : new FormControl('',[Validators.required]),
    });
  }
  //controls for validating form
  get shopFormControl() {
    return this.shopForm.controls;
  }

  addshops()
  {
    this.shop.shopName = this.shopForm.value.shopName;
    this.shop.address = this.shopForm.value.address;
    this.shop.town = this.shopForm.value.town;
    this.shop.district = this.shopForm.value.district;
    this.shop.state = this.shopForm.value.state;
    this.shop.country = this.shopForm.value.country;
    this.shop.pincode = this.shopForm.value.pincode;
    this.shop.userId =  this.userId;

    this.service.addshops(this.shop).subscribe(value => {
      console.log(value);
      this.msg = <Msg>value;
      if(this.msg.errorMsg!==null && this.msg.errorMsg.length>0){
        this.errorMsg = this.msg.errorMsg;
      }else{
        this.successMsg = this.msg.successMsg;
        this.shopForm.reset();
      }

    })

  }
}


