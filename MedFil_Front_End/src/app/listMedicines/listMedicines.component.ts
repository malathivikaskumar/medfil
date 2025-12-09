import { Component, OnInit } from '@angular/core';
import {ListMedicineService} from "./listMedicines.service";
import {MainService} from "../main.service";
import { FormControl, FormGroup } from '@angular/forms';
import { MedicineDetails } from 'src/MedicineDetails';
import { ShopDetails } from 'src/ShopDetails';
import { AddmedicineService } from '../addmedicine/addmedicine.service';
import { Msg } from '../Msg';

@Component({
  selector: 'app-listmedicines',
  templateUrl: './listMedicines.component.html',
  styleUrls: ['./listMedicines.component.css']
})
export class ListMedicinesComponent implements OnInit {
  errorMsg: string = '';
  successMsg: string = '';
  userId: number = 0;
  shopDetailsArr: ShopDetails[] = [];
  medicineDetails : MedicineDetails[] = [];
  shopIdArr: number[] = [];
  msg : Msg = new Msg();

  constructor(private service : ListMedicineService ,private medService : AddmedicineService,
    private mainService: MainService) { }


  ngOnInit(): void {
    this.mainService.userDetails.subscribe(value => {
      this.userId = value.userId;
    });
    this.getShopDetails();
  }


  addShopId(shopId: number){
    console.log("shopId::"+shopId);
   const index = this.shopIdArr.indexOf(shopId);
    console.log(index);
    if( index < 0){
      this.shopIdArr.push(shopId);
    }else{
      this.shopIdArr.splice(index, 1);
      console.log("shopIdArr::"+this.shopIdArr);
    }

  }

  getShopDetails()
  {
    this.medService.getShopDetails(this.userId).subscribe(value => {
      this.shopDetailsArr = <ShopDetails[]>value;
      console.log(this.shopDetailsArr);
      this.mainService.changeShopDetails(<ShopDetails[]>this.shopDetailsArr);
    });
  }

  listMedicine()
  {
    this.medicineDetails = [];
    this.errorMsg= '';
    const shops = this.shopIdArr.join(",");
    console.log(shops);
    this.service.listMedicine(this.userId, shops).subscribe(value => {
      this.medicineDetails = <MedicineDetails[]>(value);
      console.log(this.medicineDetails);
      if(this.medicineDetails?.length==0){
        this.errorMsg = "No medicines found for this shops";
      }
    })

  }

  deleteMedicine(medId: number)
  {
    this.medicineDetails = [];
    this.errorMsg= '';
    const shops = this.shopIdArr.join(",");
    console.log(shops);
    this.service.deleteMedicine(medId).subscribe(value => {
      this.msg = <Msg>value;
      if(this.msg.errorMsg!==null && this.msg.errorMsg.length>0){
        this.errorMsg = this.msg.errorMsg;
      }else{
        this.successMsg = this.msg.successMsg;
        this.listMedicine();
      }
    })

  }

}
