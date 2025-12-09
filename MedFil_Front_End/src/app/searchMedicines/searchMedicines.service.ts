import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SearchMedicineService {

  constructor(private http : HttpClient) { }
  
  searchMedicine(medicine:string, pincode:string)
  {
    return this.http.get('http://localhost:8080/search-medicine?medicine='+medicine+"&pincode="+pincode);
  }
}
