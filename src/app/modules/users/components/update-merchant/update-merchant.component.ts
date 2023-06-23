import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { branchList } from "src/app/modules/shared/models/Branch";
import { city } from "src/app/modules/shared/models/City";
import { governorateWithCities } from "src/app/modules/shared/models/Governorate";
import { getMerchant, updateMerchant } from "src/app/modules/shared/models/Merchant";
import { specialPrice } from "src/app/modules/shared/models/SpecialPrice";
import { BranchService } from "src/app/modules/shared/services/branch.service";
import { GovernrateService } from "src/app/modules/shared/services/governrate.service";
import { MerchantService } from "src/app/modules/shared/services/merchant.service";
import { MyToastrService } from "src/app/modules/shared/services/my-toastr.service";
import { NavTitleService } from "src/app/modules/shared/services/nav-title.service";



@Component({
  selector: 'app-update-merchant',
  templateUrl: './update-merchant.component.html',
  styleUrls: ['./update-merchant.component.css']
})
export class UpdateMerchantComponent implements OnInit {
  updateMerchantForm: FormGroup = new FormGroup({});
  governorates: governorateWithCities[] = [];
  cities: city[] = [];
  citiesPrice: city[][] = [];
  branches: branchList[] = [];
  customSpecialPrice: specialPrice[] = [];
  merchant: getMerchant|null = null;
  merchantId: string='';
  personalInfo=true
  jobInfo=false
  paymentInfo=false
  constructor(
     private toaster: MyToastrService,
    private location:Location,
    private merchantService: MerchantService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private branchService:BranchService,
    private governorateService:GovernrateService,
    private navTitleService:NavTitleService
  ) {}

  ngOnInit(): void {
    this.navTitleService.title.next('تعديل تاجر')
    this.formBuilde();
    this.loadGovernorates();
    this.loadBranches();

    this.route.params.subscribe(params => {
    this.merchantId = params['id'];
    this.loadMerchant(this.merchantId);
  });
  }

  formBuilde() {
    this.updateMerchantForm = this.formBuilder.group({
      name: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      address: ['', Validators.required],
      branchId: ['', Validators.required],
      governorateId: ['', Validators.required],
      cityId: ['', Validators.required],
      storeName: ['', Validators.required],
      pickUp: ['', Validators.required],
      returnerPercent: ['', [Validators.required, Validators.max(100), Validators.min(0)]],
      specialPrices: this.formBuilder.array([])
    });
  }
  showInfo(step:number){
    this.personalInfo=step==1
    this.jobInfo=step==3
    this.paymentInfo=step==4
  }
loadMerchant(merchantId:string) {
  this.merchantService.GetMerchant(merchantId).subscribe((response) => {

    this.merchant = response;
    console.log(this.merchant);
    this.merchant.specialPrices.forEach((element, i: any) => {
      this.specialPricesControls.push(
        this.formBuilder.group({
          governorateId: element.governorateId,
          cityId: element.cityId,
          price: element.price,
        })
      );
      this.setDefaultcitiesPrices(i);
    });
    this.setDefaultcities(this.merchant.governorateId, this.merchant.cityId);
    this.updateMerchantForm.patchValue({
      name: this.merchant.name,
      phoneNumber: this.merchant.phoneNumber,
      address: this.merchant.address,
      branchId: this.merchant.branchId,
      governorateId: this.merchant.governorateId,
      cityId: this.merchant.cityId,
      storeName: this.merchant.storeName,
      pickUp: this.merchant.pickUp,
      returnerPercent: this.merchant.returnerPercent,
      specialPrices:this.merchant.specialPrices
    });
  });
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
    const selectedGovernorateId = this.updateMerchantForm.controls['governorateId'].value;
    const selectedGovernorate = this.governorates.find((gov) => gov.id == selectedGovernorateId);
    this.cities = selectedGovernorate ? selectedGovernorate.cities : [];
    this.updateMerchantForm.controls['cityId'].setValue('');
  }

  setDefaultcities(id: any,cityid:any) {
    const selectedGovernorate = this.governorates.find((gov) => gov.id == id);
    this.cities = selectedGovernorate ? selectedGovernorate.cities : [];
    this.updateMerchantForm.controls['cityId'].setValue(cityid);
  }

  onGovernorateChangeList(i: number) {
    this.specialPricesControls.at(i).enable();
    const selectedGovernorateId = this.specialPricesControls.at(i).get('governorateId')!.value;
    const selectedGovernorate = this.governorates.find((gov) => gov.id == selectedGovernorateId);
    this.citiesPrice[i] = selectedGovernorate ? selectedGovernorate.cities : [];
    this.specialPricesControls.at(i).get('cityId')!.setValue('');
  }


  get specialPricesControls() {
    return this.updateMerchantForm.get('specialPrices') as FormArray;
  }

  addSpecialPrice() {
    const specialPrices = this.formBuilder.group({
      governorateId: ['', Validators.required],
      cityId: ['', Validators.required],
      price: ['', Validators.required],
    });
    this.citiesPrice.push([]);
    this.specialPricesControls.push(specialPrices);
  }


 setDefaultcitiesPrices(i: any) {
   const specialPriceControl = this.specialPricesControls.at(i);
   if (specialPriceControl) {
    const selectedGovernorateId = specialPriceControl.get('governorateId')!.value;
    const selectedGovernorate = this.governorates.find((gov) => gov.id == selectedGovernorateId);
    this.citiesPrice[i] = selectedGovernorate ? selectedGovernorate.cities : [];
    specialPriceControl.get('cityId')!.setValue('');
  }

 }


  remove(i: number) {
    this.specialPricesControls.removeAt(i);
  }

  onSubmit() {
    if (this.updateMerchantForm.invalid) {
      return;
    }

    this.updateMerchantForm.value.specialPrices?.forEach((element: any) => {
      this.customSpecialPrice.push({
        governorateId: Number(element.governorateId),
        cityId: Number(element.cityId),
        price: Number(element.price)
      });
    });

    const Data: updateMerchant = {
      id:this.merchantId,
      name: this.updateMerchantForm.value.name,
      phoneNumber: this.updateMerchantForm.value.phoneNumber,
      address: this.updateMerchantForm.value.address,
      branchId: Number(this.updateMerchantForm.value.branchId),
      governorateId: Number(this.updateMerchantForm.value.governorateId),
      cityId: Number(this.updateMerchantForm.value.cityId),
      storeName: this.updateMerchantForm.value.storeName,
      pickUp: this.updateMerchantForm.value.pickUp,
      returnerPercent: this.updateMerchantForm.value.returnerPercent as number,
      specialPrices: this.customSpecialPrice
    };


    this.merchantService.UpdateMerchant(Data,this.merchantId) .subscribe(res => {
      this.location.back();
      this.toaster.success("تم تعديل التاجر بنجاح");
    });
  }
}
