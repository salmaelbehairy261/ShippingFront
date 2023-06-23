import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RepresentativeGovernateDto, getRepresentative, updateRepresentative } from '../../../shared/models/Representative';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { RepresentativeService } from '../../../shared/services/representative.service';
import { governates } from 'src/app/modules/shared/models/Governorate';
import { BranchService } from 'src/app/modules/shared/services/branch.service';
import { GovernrateService } from 'src/app/modules/shared/services/governrate.service';
import { ActivatedRoute } from '@angular/router';
import { NavTitleService } from 'src/app/modules/shared/services/nav-title.service';
import { branchList } from 'src/app/modules/shared/models/Branch';
import { MyToastrService } from 'src/app/modules/shared/services/my-toastr.service';


@Component({
  selector: 'app-update-representative',
  templateUrl: './update-representative.component.html',
  styleUrls: ['./update-representative.component.css']
})
export class UpdateRepresentativeComponent {
  updateRepresentativeForm: FormGroup = new FormGroup({});
  branches:branchList[] = [];
  governorates: governates[] = [];
  dropdownSettings: IDropdownSettings = {};
  customArray: RepresentativeGovernateDto[] = [ ];
  representative: getRepresentative|null =null;
  govSelectedValue: any=[];
  representativeId: string = '';
  personalInfo=true
  jobInfo=false
  constructor(
    private toaster: MyToastrService,
    private location:Location,
    private representativeService: RepresentativeService,
    private branchService:BranchService,
    private governorateService:GovernrateService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private navTitleService:NavTitleService
  ) {}

  ngOnInit(): void {
    this.navTitleService.title.next('تعديل مندوب')
    this.formBuilde();
    this.loadBranches();
    this.loadGovernorates();
    this.route.params.subscribe(params => {
      this.representativeId = params['id'];
      this.loadRepresentative(this.representativeId);
    });
  }
  showInfo(step:number){
    this.personalInfo=step==1
    this.jobInfo=step==3
  }
formBuilde() {
  this.updateRepresentativeForm = this.formBuilder.group({
    name: ['', Validators.required],
    phoneNumber: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    address: ['', Validators.required],
    branchId: ['', Validators.required],
    amount: ['', Validators.required],
    type: ['', Validators.required],
    representativeGovernates: new FormArray([]),
  });

  this.dropdownSettings = {
      idField: 'id',
      textField: 'name',
      allowSearchFilter:true
    };
}

loadRepresentative(representativeId:string) {
  this.representativeService.GetRepresentative(representativeId).subscribe((response) => {
    this.representative = response;


    this.updateRepresentativeForm.patchValue({
      name: this.representative.name,
      phoneNumber: this.representative.phoneNumber,
      address: this.representative.address,
      branchId: this.representative.branchId,
      amount: this.representative.amount,
      type: this.representative.type,

    });

  });
}

  loadBranches() {
    this.branchService.getBranches().subscribe((response) => {
      this.branches = response;
    });
  }

 loadGovernorates() {
    this.governorateService.GetGovernorates().subscribe((response) => {
      this.governorates = response;
    });
  }


 OnSelect(ev: any) {
    var formArray: FormArray;
    formArray = this.updateRepresentativeForm.get('representativeGovernates') as FormArray;
    formArray.push(new FormControl(ev.id));

  }

  OnDeSelect(ev: any) {
    var formArray: FormArray;

      formArray = this.updateRepresentativeForm.get('representativeGovernates') as FormArray;

    let i: number = 0;

    formArray.controls.forEach((ctrl: any) => {
      if (ctrl.value == ev.id) {
        formArray.removeAt(i);
        return;
      }
      i++;
    });
  }

  OnSelectAll(ev: any) {
    var formArray: FormArray;

      formArray = this.updateRepresentativeForm.get('representativeGovernates') as FormArray;

    ev.forEach((element: { id: any }) => {
      formArray.push(new FormControl(element.id));
    });
  }

  OnDeSelectAll() {
    var formArray: FormArray;

      formArray = this.updateRepresentativeForm.get('representativeGovernates') as FormArray;

    formArray.controls.forEach((ctrl: any) => {
      formArray.clear();
    });
  }

  onSubmit() {
   // console.log(this.updateRepresentativeForm.value);
    if (this.updateRepresentativeForm.invalid) {
      return;
    }

 this.updateRepresentativeForm.value.representativeGovernates.forEach((element: any) => {
  this.customArray.push({ governateId: element});
});


    const Data: updateRepresentative = {
      id:this.representativeId,
      name: this.updateRepresentativeForm.value.name,
      phoneNumber: this.updateRepresentativeForm.value.phoneNumber,
      address: this.updateRepresentativeForm.value.address,
      branchId: Number( this.updateRepresentativeForm.value.branchId) ,
      amount: Number(this.updateRepresentativeForm.value.amount ),
      type: Number(this.updateRepresentativeForm.value.type),
      representativeGovernates: this.customArray

    };


   this.representativeService.UpdateRepresentative(Data,this.representativeId).subscribe(res => {
     this.toaster.success("تم تعديل المندوب بنجاح");
     this.location.back();
    });
  }

}

