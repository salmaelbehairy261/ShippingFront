
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup , Validators } from '@angular/forms';
//import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCity, UpdateCity, cityData } from 'src/app/modules/shared/models/City';
import { governorateWithCity } from 'src/app/modules/shared/models/Governorate';
import { CityService } from 'src/app/modules/shared/services/city.service';
import { GovernrateService } from 'src/app/modules/shared/services/governrate.service';
import { MyToastrService } from 'src/app/modules/shared/services/my-toastr.service';


@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent  implements OnInit{
  @ViewChild('selectElement') selectElement!: ElementRef<HTMLSelectElement>;
  governorates: governorateWithCity[] = [];
  cities: cityData[] = [];
  constructor(private formBuilder: FormBuilder,
    private cityService:CityService,
    private governorateService:GovernrateService,
    private toastr:MyToastrService,
    private changeDetectorRef: ChangeDetectorRef
    ) {}
  ngOnInit(): void {
    this.loadGovernorates(1);
  }
  loadGovernorates(id:any) {
    this.governorateService.GetGovernorateWithCitiesList().subscribe((response) => {
      this.governorates = response;
      this.onGovernorateChange(id);
    });
  }
  onGovernorateChange(selectedValue:any) {
    this.currentGovernorateId = Number(selectedValue);
    const selectedGovernorate = this.governorates.find((gov) => gov.id == this.currentGovernorateId);
    this.cities = selectedGovernorate ? selectedGovernorate.cities : [];
  }
currentGovernorateId:any



CityForm: FormGroup = new FormGroup({
  'Name': new FormControl(null, [Validators.required]),
  'Price': new FormControl(null, [Validators.required]),
  'Pickup': new FormControl(null, [Validators.required]),
  'GovernorateId': new FormControl(null, [Validators.required])
})
  CityUpdateForm: FormGroup = new FormGroup({
    'Name': new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Zء-ي\s]+/)]),
    'Price': new FormControl(null, [Validators.required]),
    'Pickup': new FormControl(null, [Validators.required]),
    'GovernorateId': new FormControl(null, [Validators.required]),

  })

  term: string = "";
  currentID: number = 0;
  currentGovernorate: any = null;



  GetCurrentId(id: number) {
    this.currentID = id;
    this.currentGovernorate = this.cities.find(x => x.id == id);
    this.CityUpdateForm.get('Name')?.setValue(this.currentGovernorate?.name);
  }


AddCity() {
    const object :AddCity= {
      name: this.CityForm.value.Name,
      price:this.CityForm.value.Price,
      pickup:this.CityForm.value.Pickup,
      governorateId:Number(this.CityForm.value.GovernorateId),
    }
    console.log(object)
  this.cityService.addCity(object).subscribe(res=>{
        this.toastr.success("تم اضافة المدينة بنجاح")
        this.loadGovernorates(this.CityForm.value.GovernorateId);
        this.selectOption(this.CityForm.value.GovernorateId)
        this.CityForm.reset();
      })
  }

  selectOption(optionValue: string) {
    console.log(optionValue)
    const options = this.selectElement.nativeElement.options;
    for (let i = 0; i < options.length; i++) {
      if (options[i].value == optionValue) {
        this.selectElement.nativeElement.selectedIndex = i;
        this.changeDetectorRef.detectChanges();
        console.log(i)
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
        this.onGovernorateChange(this.CityUpdateForm.value.GovernorateId);
        this.CityUpdateForm.reset();

      }
    })
  }



  /*DeleteCity() {
    this._cityServices.DeleteCity(this.currentID).subscribe({
      next: (data) => {
        this.GetAllCities(this.currentGovernorateId);
      }
    })
  }*/
}
