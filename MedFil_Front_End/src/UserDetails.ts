import {ShopDetails} from "./ShopDetails";

export class UserDetails{
  userId: number= 0;
  firstName : String = ''
  lastname : String = ''
  userEmail : string = ''
  userPassword : String = ''
  confirmpassword : string = ''
  shopDetails: ShopDetails | null = null;
  merchant: boolean = false;
}
