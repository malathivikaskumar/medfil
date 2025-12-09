import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MedicineDetails} from "../../MedicineDetails";

@Injectable({
  providedIn: 'root'
})
export class AddmedicineService {

  constructor(private http: HttpClient) { }

  addmedicine(medicineDetails : MedicineDetails)
  {
    return this.http.post('http://localhost:8080/add-medicine',medicineDetails);
  }

  getShopDetails(userId:number)
  {
    return this.http.get('http://localhost:8080/viewshops/'+userId);
  }
}
