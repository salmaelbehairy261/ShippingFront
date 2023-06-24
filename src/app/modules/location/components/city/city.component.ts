import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup , Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AddCity, UpdateCity } from 'src/app/modules/shared/models/City';
import { governates } from 'src/app/modules/shared/models/Governorate';
import { CityService } from 'src/app/modules/shared/services/city.service';
import { GovernrateService } from 'src/app/modules/shared/services/governrate.service';
import { MyToastrService } from 'src/app/modules/shared/services/my-toastr.service';
import { NavTitleService } from 'src/app/modules/shared/services/nav-title.service';


@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent  implements OnInit{
  @ViewChild('selectElement') selectElement!: ElementRef<HTMLSelectElement>;
  @ViewChild('addModal') addModal: BsModalRef | undefined;
  @ViewChild('updateModal') updateModal: BsModalRef | undefined;
  @ViewChild('deleteModal') deleteModal: BsModalRef | undefined;
  governorates: governates[] = [];
  cities: UpdateCity[] = [];
  constructor(private formBuilder: FormBuilder,
    private cityService:CityService,
    private governorateService:GovernrateService,
    private toastr:MyToastrService,
    private changeDetectorRef: ChangeDetectorRef,
    private navTitleService:NavTitleService,
    private authService:AuthService
  ) { }
  
  ngOnInit(): void {
    this.navTitleService.title.next("المدن")
    this.loadGovernorates(1);
  }
  
  hasPermission(action: string)
  {
    return this.authService.hasPermission(2,action);
  }
  loadGovernorates(id:any) {
    this.governorateService.GetGovernorates().subscribe((response) => {
      this.governorates = response;
      this.onGovernorateChange(id);
    });
  }
  onGovernorateChange(selectedValue:any) {
    this.currentGovernorateId = Number(selectedValue);
    this.cityService.getAllCities(this.currentGovernorateId).subscribe((reponse) => {
      this.cities = reponse
    })
  }
currentGovernorateId:any
CityForm: FormGroup = new FormGroup({
  Name: new FormControl(null, [Validators.required]),
  Price: new FormControl(null, [Validators.required]),
  Pickup: new FormControl(null, [Validators.required]),
  GovernorateId: new FormControl('', [Validators.required])
})
  CityUpdateForm: FormGroup = new FormGroup({
    Name: new FormControl(null, [Validators.required]),
    Price: new FormControl(null, [Validators.required]),
    Pickup: new FormControl(null, [Validators.required]),
    GovernorateId: new FormControl('', [Validators.required]),

  })
  currentID: number=0;
  currentGovernorate: any = null;

  GetCurrentId(id: number) {
    this.currentID=id
    this.cityService.getCity(id).subscribe((res:UpdateCity)=>{
      this.CityUpdateForm.patchValue({
        Name:res.name,
        Price:res.price,
        Pickup:res.pickup,
        GovernorateId:res.governorateId
      })
    })
  }

AddCity() {
    const object :AddCity= {
      name: this.CityForm.value.Name,
      price:this.CityForm.value.Price,
      pickup:this.CityForm.value.Pickup,
      governorateId:Number(this.CityForm.value.GovernorateId),
    }

  this.cityService.addCity(object).subscribe(res=>{
        this.toastr.success("تم اضافة المدينة بنجاح")
        this.loadGovernorates(this.CityForm.value.GovernorateId);
        this.selectOption(this.CityForm.value.GovernorateId)
        this.CityForm.reset();
        this.addModal!.hide();
      })
  }

  selectOption(optionValue: string) {
    console.log(optionValue)
    const options = this.selectElement.nativeElement.options;
    for (let i = 0; i < options.length; i++) {
      if (options[i].value == optionValue) {
        this.selectElement.nativeElement.selectedIndex = i;
        this.changeDetectorRef.detectChanges();

        break;
      }
    }
  }

  UpdateCity() {
    let object:UpdateCity = {
      id:this.currentID,
      name: this.CityUpdateForm.value.Name,
      price:this.CityUpdateForm.value.Price,
      pickup:this.CityUpdateForm.value.Pickup,
      governorateId:Number(this.CityUpdateForm.value.GovernorateId),
    }
    this.cityService.updateCity(this.currentID, object).subscribe({
      next: () => {
        this.toastr.success("تم تعديل المدينة بنجاح"),
        this.loadGovernorates(Number(this.CityUpdateForm.value.GovernorateId));
        this.CityUpdateForm.reset();
        this.updateModal!.hide();
      }
    })
  }
  GetCurrentCity(id:number){
    this.currentID=id
  }
  DeleteCity() {
    this.cityService.deleteCity(this.currentID).subscribe(() => {
      this.toastr.success("تم حذف المدينة بنجاح")
        this.loadGovernorates(this.currentGovernorateId);
        this.deleteModal!.hide();
      })
  }
}
