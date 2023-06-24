import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { governateName } from 'src/app/modules/shared/models/Governorate';
import { GovernrateService } from 'src/app/modules/shared/services/governrate.service';
import { MyToastrService } from 'src/app/modules/shared/services/my-toastr.service';

@Component({
  selector: 'app-new-governorate',
  templateUrl: './new-governorate.component.html',
  styleUrls: ['./new-governorate.component.css']
})
export class NewGovernorateComponent {
  constructor(private governorateService:GovernrateService,
    private toastr:MyToastrService,
    private location:Location){}
  GovernorateForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  })
  AddGovernorate() {
    const object:governateName = {
      name:this.GovernorateForm.value.name,
    }
    this.governorateService.AddGovernorate(object).subscribe(() => {
        this.GovernorateForm.reset();
        this.toastr.success("تم إضافة المحافظة بنجاح");
        this.location.back()
      })
  }
}
