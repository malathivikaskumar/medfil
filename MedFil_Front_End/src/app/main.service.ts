import { Injectable } from '@angular/core';
import {UserDetails} from "../UserDetails";
import {BehaviorSubject} from "rxjs";
import {ShopDetails} from "../ShopDetails";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor() { }

  private messageSource = new BehaviorSubject<UserDetails>(new UserDetails());
  userDetails = this.messageSource.asObservable();

  changeUserDetails(message: UserDetails) {
    this.messageSource.next(message);
  }

  private shopSource = new BehaviorSubject<ShopDetails[]>([]);
  shopDetails = this.shopSource.asObservable();

  changeShopDetails(message: ShopDetails[]) {
    this.shopSource.next(message);
  }

}
