import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserDetails} from "../../UserDetails";

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private http : HttpClient) { }
  login(user : UserDetails) {
    return this.http.post('http://localhost:8080/login', user);
  }
}
