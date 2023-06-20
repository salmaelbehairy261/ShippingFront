import { Component, OnInit } from '@angular/core';
import { WeightSettingService } from '../../../shared/services/weight-setting.service';
import { MyToastrService } from 'src/app/modules/shared/services/my-toastr.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Weight } from '../../../shared/models/weight';
import { NavTitleService } from 'src/app/modules/shared/services/nav-title.service';

@Component({
  selector: 'app-weight-setting',
  templateUrl: './weight-setting.component.html',
  styleUrls: ['./weight-setting.component.css']
})
export class WeightSettingComponent implements OnInit{

  constructor(public weightService:WeightSettingService,
    private myToastrService:MyToastrService,
    private navTitleService:NavTitleService)
  {

  }
  weight:any;
  ngOnInit(): void {
    this.navTitleService.title.next("اعدادات الوزن")
    this.weightService.getWeightById(1).subscribe(res=>{this.weight=res;
      this.WeightForm.patchValue({
        defaultWeight:this.weight.defaultWeight.toString(),
        additionalWeight:this.weight.additionalPrice.toString()
      });
    });
  }
  flag: boolean = false;

  WeightForm=new FormGroup({
    defaultWeight:new FormControl(''),
    additionalWeight:new FormControl('')
  });

  get getDefaultWeight(){
    return this.WeightForm.controls["defaultWeight"];
  }

  get getAdditionalWeight(){
    return this.WeightForm.controls["additionalWeight"];
  }
  requireOneControl() {
    if (this.WeightForm.controls["defaultWeight"].value === String(this.WeightForm.value.defaultWeight) && this.WeightForm.controls["additionalWeight"].value === String(this.WeightForm.value.additionalWeight))
    {
      this.flag=true;
    }
    else{
      this.flag=false;
    }
  }
  UpdateWeight(){
    this.requireOneControl();
    if (!this.flag)
      {
        const body:Weight ={
          id:this.weight.id,
          defaultWeight:Number(this.WeightForm.value.defaultWeight),
          additionalPrice:Number(this.WeightForm.value.additionalWeight)
          };
        console.log(body);
        this.weightService.updateWeight(body).subscribe();
        this.myToastrService.success("تمت تعديل تكلفه الشحن بنجاح");
        this.flag=false;
      }
  }

  submit(e:any){e.e.preventDefault();}
}
