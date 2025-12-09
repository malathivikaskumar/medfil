import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ViewshopsService {

  constructor(private http : HttpClient) { }
  viewshops(userId:number)
  {
    return this.http.get('http://localhost:8080/viewshops/'+userId);
  }
  deleteshop(shopId:number)
  {
    return this.http.get('http://localhost:8080/delete-shop?shopId='+shopId);
  }
}
