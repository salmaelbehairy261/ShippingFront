import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReasonsRefusalTypeAdd } from 'src/app/modules/shared/models/ReasonsRefusalType';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { NavTitleService } from 'src/app/modules/shared/services/nav-title.service';
import { ReasonsRefusalServiceService } from 'src/app/modules/shared/services/reasons-refusal-service.service';

@Component({
  selector: 'app-addreason',
  templateUrl: './addreason.component.html',
  styleUrls: ['./addreason.component.css']
})
export class AddreasonComponent implements OnInit {
 
  constructor(private reasonsRefusalTypeService: ReasonsRefusalServiceService,
    private navTitleService: NavTitleService,
    private authService: AuthService,
  ) {
  
    
  }
  ngOnInit(): void {
      this.navTitleService.title.next("اضافة سبب الرفض")
  }

   hasPermission(action: string)
  {
    return this.authService.hasPermission(10,action);
  } 



  AddReasonRefusalForm=new FormGroup({
    name:new FormControl('',[Validators.required])
  });

  get getName(){
    return this.AddReasonRefusalForm.controls["name"];
  }



  addReasonRefusal(reasonsRefusalType:ReasonsRefusalTypeAdd){
    this.reasonsRefusalTypeService.addReasonsRefusalType(reasonsRefusalType)
  }


  AddReasonRefusal(){
    if (this.AddReasonRefusalForm.status=="VALID")
      {
        const body:ReasonsRefusalTypeAdd ={
          name:String(this.AddReasonRefusalForm.value.name)
        };
        this.addReasonRefusal(body);
        
        
        this.ngOnInit();
      }
     
  }


}
