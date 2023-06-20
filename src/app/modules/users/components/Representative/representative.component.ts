import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RepresentativeService } from '../../../shared/services/representative.service';
import { addRepresentative, RepresentativeGovernateDto } from '../../../shared/models/Representative';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {  branchList } from 'src/app/modules/shared/models/Branch';
import { governates } from 'src/app/modules/shared/models/Governorate';
import { BranchService } from 'src/app/modules/shared/services/branch.service';
import { GovernrateService } from 'src/app/modules/shared/services/governrate.service';
import { NavTitleService } from 'src/app/modules/shared/services/nav-title.service';

@Component({
  selector: 'app-representative',
  templateUrl: './representative.component.html',
  styleUrls: ['./representative.component.css']
})
export class RepresentativeComponent implements OnInit {
  representativeForm: FormGroup = new FormGroup({});
  branches:branchList[] = [];
  governorates: governates[] = [];
  dropdownSettings: IDropdownSettings = {};
  customArray: RepresentativeGovernateDto[] = [ ];


  constructor(
    private representativeService: RepresentativeService,
    private branchService:BranchService,
    private governorateService:GovernrateService,
    private formBuilder: FormBuilder,
    private navTitleService:NavTitleService
  ) {

  }

  ngOnInit(): void {
    this.navTitleService.title.next('اضافة مندوب')
    this.formBuilde();
    this.loadBranches();
    this.loadGovernorates();
  }

formBuilde() {
  this.representativeForm = this.formBuilder.group({
    name: ['', Validators.required],
    userName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    phoneNumber: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    address: ['', Validators.required],
    branch: ['', Validators.required],
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
    formArray = this.representativeForm.get('representativeGovernates') as FormArray;
    formArray.push(new FormControl(ev.id));
   console.log(ev);
  }

  OnDeSelect(ev: any) {
    var formArray: FormArray;

      formArray = this.representativeForm.get('representativeGovernates') as FormArray;

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

      formArray = this.representativeForm.get('representativeGovernates') as FormArray;

    ev.forEach((element: { id: any }) => {
      formArray.push(new FormControl(element.id));
    });
  }

  OnDeSelectAll() {
    var formArray: FormArray;

      formArray = this.representativeForm.get('representativeGovernates') as FormArray;

    formArray.controls.forEach((ctrl: any) => {
      formArray.clear();
    });
  }





  onSubmit() {
    if (this.representativeForm.invalid) {
      return;
    }

 this.representativeForm.value.representativeGovernates.forEach((element: any) => {
  this.customArray.push({ governateId: element});
});


    const Data: addRepresentative = {
      name: this.representativeForm.value.name,
      userName: this.representativeForm.value.userName,
      email: this.representativeForm.value.email,
      password: this.representativeForm.value.password,
      phoneNumber: this.representativeForm.value.phoneNumber,
      address: this.representativeForm.value.address,
      branchId: Number( this.representativeForm.value.branch) ,
      amount: Number(this.representativeForm.value.amount ),
      type: Number(this.representativeForm.value.type),
      representativeGovernates: this.customArray

    };

    console.log(Data);
    this.representativeService.AddRepresentative(Data);
  }

}
