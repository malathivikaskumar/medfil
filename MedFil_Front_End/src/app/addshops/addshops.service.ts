import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ShopDetails} from "../../ShopDetails";

@Injectable({
  providedIn: 'root'
})
export class AddshopsService {

  constructor(private http: HttpClient) { }

  addshops(shop : ShopDetails)
  {
    return this.http.post('http://localhost:8080/add-shop', shop);
  }
}
