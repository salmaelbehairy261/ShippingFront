import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { shippingTypeAdd } from 'src/app/modules/shared/models/shippingTypeAdd';
import { MyToastrService } from 'src/app/modules/shared/services/my-toastr.service';
import { NavTitleService } from 'src/app/modules/shared/services/nav-title.service';
import { ShippingTypeService } from 'src/app/modules/shared/services/shipping-type.service';

@Component({
  selector: 'app-add-shipping',
  templateUrl: './add-shipping.component.html',
  styleUrls: ['./add-shipping.component.css']
})
export class AddShippingComponent implements OnInit {
 

  constructor(private shippingTypeService: ShippingTypeService,
    private myToastrService: MyToastrService,
    private navTitleService: NavTitleService,
  private  location:Location
  ) {
   
    
  }
  ngOnInit(): void {
    this.navTitleService.title.next("اضافة نوع شحن ")
  }

   AddShippingTypeForm=new FormGroup({
    Name:new FormControl('',[Validators.required]),
    Cost:new FormControl('',[Validators.required])
   });
  
   get getName(){
    return this.AddShippingTypeForm.controls["Name"];
  }

  get getCost(){
    return this.AddShippingTypeForm.controls["Cost"];
  }
 flag: boolean = false;

  
   AddShippingType(){
    if (this.AddShippingTypeForm.status=="VALID")
      {
        const body:shippingTypeAdd ={
          Name:String(this.AddShippingTypeForm.value.Name),
          Cost:Number(this.AddShippingTypeForm.value.Cost)
        };
       
        this.shippingTypeService.addShippingType(body).subscribe(err=>console.log(err));
        this.flag=false;
        this.ngOnInit();
      this.myToastrService.success("تمت اضافه نوع الشحن بنجاح");
      this.location.back();
      }
      else{
        this.flag=true;
      }
  }



}
