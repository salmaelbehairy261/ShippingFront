import { Component, OnInit } from '@angular/core';
import { WeightSettingService } from '../../../shared/services/weight-setting.service';
import { MyToastrService } from 'src/app/modules/shared/services/my-toastr.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Weight } from '../../../shared/models/weight';
import { NavTitleService } from 'src/app/modules/shared/services/nav-title.service';
import { AuthService } from 'src/app/modules/shared/services/auth.service';

@Component({
  selector: 'app-weight-setting',
  templateUrl: './weight-setting.component.html',
  styleUrls: ['./weight-setting.component.css']
})
export class WeightSettingComponent implements OnInit{

  constructor(public weightService:WeightSettingService,
    private myToastrService:MyToastrService,
    private navTitleService: NavTitleService,
   private authService:AuthService,)
  {

  }
  weight:any;
  ngOnInit(): void {
    if (!this.hasPermission('Edit'))
    {
      this.getAdditionalWeight.disable();
      this.getDefaultWeight.disable();
    }
    this.navTitleService.title.next("اعدادات الوزن")
    this.weightService.getWeightById(1).subscribe(res=>{this.weight=res;
      this.WeightForm.patchValue({
        defaultWeight:this.weight.defaultWeight.toString(),
        additionalWeight:this.weight.additionalPrice.toString()
      },{emitEvent:false});
    });
    this.WeightForm.valueChanges.subscribe(value => {
      this.saveBtnFlag=false;
    });
  }
  flag: boolean = false;
  saveBtnFlag:boolean=true;
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

 hasPermission(action: string)
  {
    return this.authService.hasPermission(13,action);
  }  

  UpdateWeight(){
    this.requireOneControl();
    if (!this.flag && Number(this.WeightForm.value.defaultWeight)!=0 && Number(this.WeightForm.value.additionalWeight)!=0)
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
    else if(Number(this.WeightForm.value.defaultWeight)!=0 || Number(this.WeightForm.value.additionalWeight)!=0){
      this.myToastrService.error("من فضلك ادخل قيم صحيحه")
    }
  }

  submit(e:any){e.e.preventDefault();}
}
