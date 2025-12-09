import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserDetails} from "../../UserDetails";

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private http : HttpClient) { }
  resetpassword(user : UserDetails) {
    return this.http.post('http://localhost:8080/reset-password', user);
  }
}
