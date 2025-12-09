import { Injectable } from '@angular/core';
import {UserDetails} from "../../UserDetails";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http:HttpClient) { }
  registration(user : UserDetails)
  {
    return this.http.post('http://localhost:8080/registration',user)
  }
}
