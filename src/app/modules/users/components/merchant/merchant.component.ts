import { branchList } from './../../../shared/models/Branch';
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, AbstractControl } from "@angular/forms";
import { addMerchant } from "../../../shared/models/Merchant";
import { MerchantService } from "../../../shared/services/merchant.service";
import { specialPrice } from "../../../shared/models/SpecialPrice";

import { city } from "src/app/modules/shared/models/City";
import { governorateWithCities } from "src/app/modules/shared/models/Governorate";
import { BranchService } from "src/app/modules/shared/services/branch.service";
import { GovernrateService } from "src/app/modules/shared/services/governrate.service";
import { NavTitleService } from "src/app/modules/shared/services/nav-title.service";
import { MyToastrService } from 'src/app/modules/shared/services/my-toastr.service';
import { Location } from '@angular/common';
import { UsernameEmailService } from 'src/app/modules/shared/services/username-email.service';

@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.css']
})
export class MerchantComponent implements OnInit {
  userInfo=false
  personalInfo=true
  jobInfo=false
  paymentInfo=false
  merchantForm: FormGroup = new FormGroup({});
  governorates: governorateWithCities[] = [];
  cities: city[] = [];
  citiesPrice: city[][] = [];
  branches:branchList[] = [];
  customSpecialPrice: specialPrice[] = [];
  showPassword = false;
  isEmailValid=true
  isUserNameValid=true
  constructor(
    private toaster: MyToastrService,
    private location:Location,
    private merchantService: MerchantService,
    private branchService:BranchService,
    private governorateService:GovernrateService,
    private formBuilder: FormBuilder,
    private navTitleService:NavTitleService,
    private usernameEmailService:UsernameEmailService
  ) {}
  showInfo(step:number){
    this.personalInfo=step==1
    this.userInfo=step==2
    this.jobInfo=step==3
    this.paymentInfo=step==4
  }
  ngOnInit(): void {
    this.navTitleService.title.next('اضافة تاجر')
    this.merchantForm = this.formBuilder.group({
      name: ['', Validators.required],
      userName: ['', [Validators.required, Validators.pattern('^(?!.*[\u0600-\u06FF]).*$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,  Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*.,?]).{8,}$')]],
      phoneNumber: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      address: ['', Validators.required],
      branch: ['', Validators.required],
      governorate: ['', Validators.required],
      city: [{ value: '', disabled: true }, Validators.required],
      storeName: ['', Validators.required],
      pickUp: ['', Validators.required],
      returnerPercent: ['', [Validators.required, Validators.max(100), Validators.min(0)]],
      specialPrices: this.formBuilder.array([])
    });

    this.loadGovernorates();
    this.loadBranches();
  }

  loadGovernorates() {
    this.governorateService.GetGovernorateWithCityList().subscribe((response) => {
      this.governorates = response;
    });
  }

  loadBranches() {
    this.branchService.getBranches().subscribe((response) => {
      this.branches = response;
    });
  }

  onGovernorateChange() {
    this.merchantForm.controls['city'].enable()
    const selectedGovernorateId = this.merchantForm.controls['governorate'].value;
    const selectedGovernorate = this.governorates.find((gov) => gov.id == selectedGovernorateId);
    this.cities = selectedGovernorate ? selectedGovernorate.cities : [];
    this.merchantForm.controls['city'].setValue('');

  }


onGovernorateChangeList(i: number) {
  this.specialPricesControls.at(i).enable()
  const selectedGovernorateId = this.specialPricesControls.at(i).get('governorateId')!.value;
  const selectedGovernorate = this.governorates.find((gov) => gov.id == selectedGovernorateId);
  this.citiesPrice [i]= selectedGovernorate ? selectedGovernorate.cities : [];
  this.specialPricesControls.at(i).get('cityId')!.setValue('');
}




 get specialPricesControls(){
    return this.merchantForm.get('specialPrices') as FormArray;
 }
  addSpecialPrice() {
    const specialPrices = this.formBuilder.group({
      governorateId: ['', Validators.required],
      cityId: [{ value: '', disabled: true }, Validators.required],
      price: ['', Validators.required],
    });
    this.citiesPrice.push([]);
    this.specialPricesControls.push(specialPrices);
  }

  remove(i:number){
    this.specialPricesControls.removeAt(i);
  }


  onSubmit() {
    if (this.merchantForm.invalid) {
      return;
    }
    this.merchantForm.value.specialPrices?.forEach((element: any) => {
      this.customSpecialPrice.push({
        governorateId: Number(element.governorateId),
        cityId: Number(element.cityId),
        price: Number(element.price)

      });
    })




    const merchantData: addMerchant = {
      name: this.merchantForm.value.name,
      userName: this.merchantForm.value.userName,
      email: this.merchantForm.value.email,
      password: this.merchantForm.value.password,
      phoneNumber: this.merchantForm.value.phoneNumber,
      address: this.merchantForm.value.address,
      branchId: Number(this.merchantForm.value.branch ),
      governorateId:Number( this.merchantForm.value.governorate),
      cityId: Number(this.merchantForm.value.city ),
      storeName: this.merchantForm.value.storeName,
      pickUp: this.merchantForm.value.pickUp,
      returnerPercent: this.merchantForm.value.returnerPercent as number,
      specialPrices: this.customSpecialPrice

    };


   this.merchantService.AddMerchant(merchantData).subscribe(res => {
     this.toaster.success("تم إضافة التاجر بنجاح");
     this.location.back();
      });
  }
  checkUserName(){
    if(this.merchantForm.controls['userName'].valid){
      this.usernameEmailService.isUniqueUserName(this.merchantForm.value.userName).subscribe(res=>{
        if(res["message"]=="Valid"){
          this.isUserNameValid=true
        }else if(res["message"]=="Invalid"){
          this.isUserNameValid=false
        }
      })
    }
  }
  checkEmail(){
    if(this.merchantForm.controls['email'].valid){
      this.usernameEmailService.isUniqueEmail(this.merchantForm.value.email).subscribe(res=>{
        if(res["message"]=="Valid"){
          this.isEmailValid=true
        }else if(res["message"]=="Invalid"){
          this.isEmailValid=false
        }
      })
    }
  }
}
