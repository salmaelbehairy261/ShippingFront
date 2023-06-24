import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AddCity, cityData } from 'src/app/modules/shared/models/City';
import { governates, governorateWithCity } from 'src/app/modules/shared/models/Governorate';
import { CityService } from 'src/app/modules/shared/services/city.service';
import { GovernrateService } from 'src/app/modules/shared/services/governrate.service';
import { MyToastrService } from 'src/app/modules/shared/services/my-toastr.service';

@Component({
  selector: 'app-new-city',
  templateUrl: './new-city.component.html',
  styleUrls: ['./new-city.component.css']
})
export class NewCityComponent implements OnInit{
   governorates: governates[] = [];
    cities: cityData[]=[];
  constructor(private cityService:CityService,
    private toastr:MyToastrService,
    private location:Location,
    private governorateService:GovernrateService,){}
  ngOnInit(): void {
    this.governorateService.GetGovernorates().subscribe((response) => {
      this.governorates = response
    });
  }
   
  CityForm: FormGroup = new FormGroup({
    Name: new FormControl(null, [Validators.required]),
    Price: new FormControl(null, [Validators.required]),
    Pickup: new FormControl(null, [Validators.required]),
    GovernorateId: new FormControl('', [Validators.required])
  })
  AddCity() {
    const object :AddCity= {
      name: this.CityForm.value.Name,
      price:this.CityForm.value.Price,
      pickup:this.CityForm.value.Pickup,
      governorateId:Number(this.CityForm.value.GovernorateId),
    }
  this.cityService.addCity(object).subscribe(res=>{
        this.toastr.success("تم اضافة المدينة بنجاح")
        this.location.back()
      })
  }
 
}
