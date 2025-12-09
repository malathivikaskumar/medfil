import { Component, OnInit } from '@angular/core';
import {SearchMedicineService} from "./searchMedicines.service";
import {MainService} from "../main.service";
import { FormControl, FormGroup } from '@angular/forms';
import { MedicineDetails } from 'src/MedicineDetails';

@Component({
  selector: 'app-searchmedicines',
  templateUrl: './searchMedicines.component.html',
  styleUrls: ['./searchMedicines.component.css']
})
export class SearchMedicinesComponent implements OnInit {

  userId: number = 0;

  medicineDetails : MedicineDetails[] = [];

  constructor(private service : SearchMedicineService ,private mainService: MainService) { }
  errorMsg: string = '';

  ngOnInit(): void {
    this.mainService.userDetails.subscribe(value => {
      this.userId = value.userId;
    });
  }

  searchMedicineForm = new FormGroup({
    medName : new FormControl(''),
    pincode : new FormControl('')
  });


  searchMedicine()
  {
    this.errorMsg= '';
    let medName = this.searchMedicineForm.value.medName;
    let pincode = this.searchMedicineForm.value.pincode;
    this.service.searchMedicine(medName, pincode).subscribe(value => {
      this.medicineDetails = <MedicineDetails[]>(value);
      console.log(this.medicineDetails);
      if(this.medicineDetails?.length==0){
        this.errorMsg = "No shops found for this medicine";
      }
    })

  }

}
