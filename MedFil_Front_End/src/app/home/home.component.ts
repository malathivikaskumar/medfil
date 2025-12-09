import { Component, OnInit } from '@angular/core';
import {MainService} from "../main.service";
import {UserDetails} from "../../UserDetails";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private mainService: MainService) { }

  userDetails: UserDetails = new UserDetails();

  ngOnInit(): void {

    this.mainService.userDetails.subscribe(value => {
      this.userDetails = value;
      console.log(this.userDetails);
    });

  }

}
