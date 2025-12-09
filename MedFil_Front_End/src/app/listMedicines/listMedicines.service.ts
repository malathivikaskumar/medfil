import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ListMedicineService {

  constructor(private http : HttpClient) { }
  
  listMedicine(userId:number, shops:string)
  {
    return this.http.get('http://localhost:8080/list-medicine?userId='+userId+"&shops="+shops);
  }

  deleteMedicine(medId:number)
  {
    return this.http.get('http://localhost:8080/delete-medicine?medId='+medId);
  }
}
