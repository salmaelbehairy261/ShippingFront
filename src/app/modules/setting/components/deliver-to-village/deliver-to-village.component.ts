import { Component, OnInit } from '@angular/core';
import { MyToastrService } from 'src/app/modules/shared/services/my-toastr.service';
import { FormControl, FormGroup } from '@angular/forms';
import { DeliverToVillageService } from '../../../shared/services/deliver-to-village.service';
import { DeliverToVillage } from '../../../shared/models/deliverToVillage';
import { NavTitleService } from 'src/app/modules/shared/services/nav-title.service';
import { AuthService } from 'src/app/modules/shared/services/auth.service';

@Component({
  selector: 'app-deliver-to-village',
  templateUrl: './deliver-to-village.component.html',
  styleUrls: ['./deliver-to-village.component.css']
})
export class DeliverToVillageComponent implements OnInit{
  constructor(public deliverToVillageService:DeliverToVillageService,
    private myToastrService:MyToastrService,
    private navTitleService: NavTitleService,
   private authService:AuthService,)
  {

  }
  defaultDeliver:any;
 
  ngOnInit(): void {
    if (!this.hasPermission('Edit'))
      this.getDefaultWeight.disable();
    this.navTitleService.title.next("التوصيل لقرية")
    this.deliverToVillageService.getDeliverToVillageById(1).subscribe(res=>{this.defaultDeliver=res;
      this.DeliverToVillageForm.patchValue({
        additionalCost:this.defaultDeliver.additionalCost.toString()
      },{emitEvent:false});
    });
    this.DeliverToVillageForm.valueChanges.subscribe(value => {
      this.saveBtnFlag=false;
    });
  }
  saveBtnFlag:boolean=true;

  flag: boolean = false;

  DeliverToVillageForm=new FormGroup({
    additionalCost:new FormControl('')
  });

  get getDefaultWeight(){
    return this.DeliverToVillageForm.controls["additionalCost"];
  }


  requireOneControl() {
    if (this.DeliverToVillageForm.controls["additionalCost"].value === String(this.defaultDeliver.additionalCost) )
    {
      this.flag=true;
    }
    else{
      this.flag=false;
    }
  }
   hasPermission(action: string)
  {
    return this.authService.hasPermission(12,action);
  } 
  UpdateWeight(){
    this.requireOneControl();
    if (!this.flag && Number(this.DeliverToVillageForm.value.additionalCost)!=0)
      {
        const body:DeliverToVillage ={
          id:this.defaultDeliver.id,
          additionalCost:Number(this.DeliverToVillageForm.value.additionalCost)
          };
      
        this.deliverToVillageService.updateDeliverToVillage(body).subscribe();
        this.myToastrService.success("تمت تعديل تكلفه الشحن للقريه بنجاح");
        this.flag=false;
      }
      else if(Number(this.DeliverToVillageForm.value.additionalCost)==0 ){
        this.myToastrService.error("من فضلك ادخل قيم صحيحه")
      }
  }

  submit(e:any){e.e.preventDefault();}
}
