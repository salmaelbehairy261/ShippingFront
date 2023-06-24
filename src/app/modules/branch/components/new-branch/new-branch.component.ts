import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { addBranch } from 'src/app/modules/shared/models/Branch';
import { BranchService } from 'src/app/modules/shared/services/branch.service';
import { MyToastrService } from 'src/app/modules/shared/services/my-toastr.service';

@Component({
  selector: 'app-new-branch',
  templateUrl: './new-branch.component.html',
  styleUrls: ['./new-branch.component.css']
})
export class NewBranchComponent {


  constructor(
    private branchService: BranchService,
    private toastr:MyToastrService,
    private location:Location) {

  }
BranchForm: FormGroup = new FormGroup({
    'Name': new FormControl(null, [Validators.required]),
})



    AddBranch() {
    if (this.BranchForm.invalid) return;
    let object:addBranch = {
      name:this.BranchForm.value.Name,
    }

    this.branchService.addBranch(object).subscribe({
      next: () => {
        this.BranchForm.reset();
        this.toastr.success("تم إضافة الفرع بنجاح");
        this.location.back()
      }
    })

  }


}

