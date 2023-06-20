
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { governate, governateName, governates, governorateResponse } from 'src/app/modules/shared/models/Governorate';
import { Params } from 'src/app/modules/shared/models/Params';
import { GovernrateService } from 'src/app/modules/shared/services/governrate.service';




@Component({
  selector: 'app-governorate',
  templateUrl: './governorate.component.html',
  styleUrls: ['./governorate.component.css']
})

export class GovernorateComponent {
  @ViewChild('addModal') addModal: BsModalRef | undefined;
  @ViewChild('updateModal') updateModal: BsModalRef | undefined;
  @ViewChild('deleteModal') deleteModal: BsModalRef | undefined;
  @ViewChild('search') searchTerms?: ElementRef;
  isDesc:boolean=false
  governerates: governates[] = []
  constructor(private governorateService:GovernrateService) {}
  term: string = "";
  currentID: number = 0;
  currentGovernorate: any = null;
  govParams = new Params();
  totalCount = 0;

  GetCurrentId(id: number) {
    this.currentID = id;
  }
  GetCurrentGov(id:number){
    this.currentID = id;
    this.currentGovernorate = this.governerates.find(x => x.id == id);
    this.GovernorateUpdateForm.get('name')?.setValue(this.currentGovernorate?.name);
  }
  GovernorateUpdateForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  })

  GovernorateForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  })

  ngOnInit(): void {
    this.GetAllGovernorates();
  }
  GetAllGovernorates() {
    this.governorateService.GetAllGovernorates(this.govParams).subscribe((data:governorateResponse) => {
        this.governerates = data.data;
        this.govParams.pageNumper = data.pageIndex;
        this.govParams.pageSize = data.pageSize;
        this.totalCount=data.pageCount
      });
  }

  AddGovernorate() {
    const object:governateName = {
      name:this.GovernorateForm.value.name,
    }
    this.governorateService.AddGovernorate(object).subscribe(() => {
        this.GetAllGovernorates();
        this.GovernorateForm.reset();
        this.addModal!.hide();
      })
  }

  UpdateGovernorate() {
    const obj:governate= {
      id: this.currentID,
      name: this.GovernorateUpdateForm.value.name,
    }
    this.governorateService.UpdateGovernorate(obj,this.currentID).subscribe(() => {
        this.GetAllGovernorates();
        this.updateModal!.hide();
      })
  }

  DeleteGovernorate() {
    this.governorateService.DeleteGovernorate(this.currentID).subscribe((data) => {
        this.GetAllGovernorates();
        this.deleteModal!.hide();
      })
  }


  onPageChanged(event: any)
  {
    if (this.govParams.pageNumper !== event.page)
    {
      this.govParams.pageNumper = event.page;
      this.GetAllGovernorates();

      }
  }

  onSearch() {
    this.govParams.search = this.searchTerms?.nativeElement.value;
    this.govParams.pageNumper = 1;
    this.GetAllGovernorates();
  }
  onReset() {
    if (this.searchTerms)
      this.searchTerms.nativeElement.value = ""
    this.govParams = new Params();
    this.GetAllGovernorates();
  }
  onSort(){
    this.isDesc=!this.isDesc;
    this.govParams.sort=this.isDesc?'Desc':''
    this.GetAllGovernorates();
  }
  onPageSizeChange(event:any){
    const pageSize=parseInt(event.target.value)
    if (pageSize > 0 && pageSize < 50){
      this.govParams.pageSize=pageSize
      this.GetAllGovernorates()
    }
  }


}


