import { Component, OnInit } from '@angular/core';
import {ViewshopsService} from "./viewshops.service";
import {UserDetails} from "../../UserDetails";
import {ShopDetails} from "../../ShopDetails";
import {MainService} from "../main.service";
import { Msg } from '../Msg';

@Component({
  selector: 'app-viewshops',
  templateUrl: './viewshops.component.html',
  styleUrls: ['./viewshops.component.css']
})
export class ViewshopsComponent implements OnInit {

  userId: number = 0;
  msg : Msg = new Msg();
  shopDetailsArr: ShopDetails[] = [];
  errorMsg: string = '';
  successMsg: string = '';

  constructor(private service : ViewshopsService,private mainService: MainService) { }

  ngOnInit(): void {
    this.mainService.userDetails.subscribe(value => {
      this.userId = value.userId;
    });
    this.viewshops();
  }

  viewshops()
  {
    this.service.viewshops(this.userId).subscribe(value => {
      this.shopDetailsArr = <ShopDetails[]>value;
      console.log(this.shopDetailsArr);
      this.mainService.changeShopDetails(<ShopDetails[]>this.shopDetailsArr)
    })

  }

  deleteShop(shopId: number)
  {
    if(confirm("Deleting this shop will delete all medicine of this shop. Are you sure to continue ?")) {
      console.log("Deleting");
      this.shopDetailsArr = [];
      this.errorMsg= '';
      this.service.deleteshop(shopId).subscribe(value => {
        this.msg = <Msg>value;
        if(this.msg.errorMsg!==null && this.msg.errorMsg.length>0){
          this.errorMsg = this.msg.errorMsg;
        }else{
          this.successMsg = this.msg.successMsg;
          this.viewshops();
        }
      })
    }else{
      console.log("not Deleting");
    }
  }
}
