import { Component, OnInit } from '@angular/core';
import {AddmedicineService} from "./addmedicine.service";
import {FormControl, FormGroup} from "@angular/forms";
import {MedicineDetails} from "../../MedicineDetails";
import {MainService} from "../main.service";
import {ShopDetails} from "../../ShopDetails";
import {Msg} from "../Msg";

@Component({
  selector: 'app-addMedicine',
  templateUrl: './addMedicine.component.html',
  styleUrls: ['./addMedicine.component.css']
})
export class AddmedicineComponent implements OnInit {



  medicineDetails : MedicineDetails = new MedicineDetails();
  userId : number = 0;
  shopDetailsArr: ShopDetails[] = [];
  msg : Msg = new Msg();
  successMsg: string = '';
  errorMsg: string = '';
  shopIdArr: number[] = [];

  constructor(private service : AddmedicineService,private mainService: MainService) { }
  ngOnInit(): void {
    this.mainService.userDetails.subscribe(value => {
      this.userId = value.userId;
    });
    this.getShopDetails();
  }
  addMedicineForm = new FormGroup({
    medName : new FormControl(),
    medQuantity : new FormControl(),
    medExpiryDate : new FormControl(),
    medCost : new FormControl(),
    medDescription : new FormControl(),

  });

  addShopId(shopId: number){
    console.log("shopId::"+shopId);
   const index = this.shopIdArr.indexOf(shopId);
    console.log(index);
    if( index < 0){
      this.shopIdArr.push(shopId);
    }else{
      this.shopIdArr.slice(index, 1);
      console.log("shopIdArr::"+this.shopIdArr);
    }

  }


  addMedicine()
  {

    this.successMsg = '';
    this.errorMsg = '';
    console.log(this.addMedicineForm.value.shops);
    this.medicineDetails.shopIdList = this.shopIdArr;
    this.medicineDetails.medName = this.addMedicineForm.value.medName;
    this.medicineDetails.medCost = this.addMedicineForm.value.medCost;
    this.medicineDetails.medQuantity = this.addMedicineForm.value.medQuantity;
    this.medicineDetails.medExpiryDate = this.addMedicineForm.value.medExpiryDate;
    this.medicineDetails.medDescription = this.addMedicineForm.value.medDescription;

    if(this.shopIdArr.length <=0 ){
      this.errorMsg = "Must select atleast 1 shop";
      return;
    }

    this.service.addmedicine(this.medicineDetails).subscribe( value => {
      console.log(value);
      this.msg = <Msg>value;

      if(this.msg.errorMsg!==null && this.msg.errorMsg.length>0){
        this.errorMsg = this.msg.errorMsg;
      }else{
        this.successMsg = this.msg.successMsg;
        this.addMedicineForm.reset();
      }

    });
  }


  getShopDetails()
  {
    this.service.getShopDetails(this.userId).subscribe(value => {
      this.shopDetailsArr = <ShopDetails[]>value;
      console.log(this.shopDetailsArr);
      this.mainService.changeShopDetails(<ShopDetails[]>this.shopDetailsArr);
  })

}
}


