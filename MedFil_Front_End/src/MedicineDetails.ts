import { ShopDetails } from "./ShopDetails";

export class MedicineDetails{
  shopIdList: number[] = [];
  shopId : number = 0;
  medId : number = 0;
  medName : String = '';
  medQuantity : number = 0;
  medExpiryDate : String ='';
  medDescription : String = '';
  medCost : number =0;
  shopDetails: ShopDetails = new ShopDetails();
}
