
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { governate, governateName } from 'src/app/modules/shared/models/Governorate';
import { Governates } from 'src/app/modules/shared/models/Representative';
import { GovernrateService } from 'src/app/modules/shared/services/governrate.service';




@Component({
  selector: 'app-governorate',
  templateUrl: './governorate.component.html',
  styleUrls: ['./governorate.component.css']
})

export class GovernorateComponent {
  governerates: Array<any> = [];

  @ViewChild('closeModal') closeModal: ElementRef<any> | undefined;


  constructor(private governorateService:GovernrateService) {
    }

  term: string = "";
  currentID: number = 0;
  currentGovernorate: any = null;

  GetCurrentId(id: number) {
    this.currentID = id;
    this.currentGovernorate = this.governerates.find(x => x.id == id);
    this.GovernorateUpdateForm.get('Name')?.setValue(this.currentGovernorate?.name);
  }

  GovernorateUpdateForm: FormGroup = new FormGroup({
    'Name': new FormControl(null, [Validators.required]),
  })

  GovernorateForm: FormGroup = new FormGroup({
    'Name': new FormControl(null, [Validators.required]),
  })

  ngOnInit(): void {
    this.GetAllGovernorates();
  }
  GetAllGovernorates() {
    this.governorateService.GetGovernorates().subscribe((data) => {
        this.governerates = data;
        console.log(data);
    })
  }

  AddGovernorate(data: FormGroup) {
    if (this.GovernorateForm.invalid) return;
    const object:governateName = {
      name: data.value.Name,
    }
    this.governorateService.AddGovernorate(object).subscribe(() => {
        this.GetAllGovernorates();
        this.GovernorateForm.reset();
        this.closeModal?.nativeElement.click();
      })
  }

  UpdateGovernorate(data: FormGroup) {
    const obj:governate= {
      id: this.currentID,
      name: data.value.Name,
    }

    this.governorateService.UpdateGovernorate(obj,this.currentID).subscribe(() => {
        this.GetAllGovernorates();
      })
  }

  DeleteGovernorate() {
    this.governorateService.DeleteGovernorate(this.currentID).subscribe((data) => {
        this.GetAllGovernorates();
      })
  }
}


