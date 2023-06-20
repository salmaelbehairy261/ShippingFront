import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { addBranch, getAllBranch, updateBranch } from 'src/app/modules/shared/models/Branch';
import { Params } from 'src/app/modules/shared/models/Params';
import { BranchService } from 'src/app/modules/shared/services/branch.service';
import { MyToastrService } from 'src/app/modules/shared/services/my-toastr.service';
@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent {
   @ViewChild('closeModal') closeModal: ElementRef<any> | undefined;
  @ViewChild('search') searchTerms?: ElementRef;
  branches: getAllBranch[] = [];
  branchParams = new Params;
  totalCount = 0;
  isDesc:boolean=false
 

  constructor(private branchService: BranchService,private toastr:MyToastrService
) {


  }


  term: string = "";
  currentID: number = 0;
  currentBranch: any = null;

  GetCurrentId(id: number) {
    this.currentID = id;
    this.currentBranch = this.branches.find(x => x.id == id);
    this.BranchUpdateForm.get('Name')?.setValue(this.currentBranch?.name);
  }

  BranchUpdateForm: FormGroup = new FormGroup({
    'Name': new FormControl(null, [Validators.required]),
  })

  BranchForm: FormGroup = new FormGroup({
    'Name': new FormControl(null, [Validators.required]),
  })

  ngOnInit(): void {
    this.GetAllBranches();
  }

  GetAllBranches() {
    this.branchService.getAllBranchs(this.branchParams).subscribe((response) => {
    this.branches = response.data;
    this.branchParams.pageNumper = response.pageIndex;
    this.branchParams.pageSize = response.pageSize;
    this.totalCount=response.pageCount

    });
  }

  AddBranch() {
    if (this.BranchForm.invalid) return;
    let object:addBranch = {
      name:this.BranchForm.value.Name,
    }


    this.branchService.addBranch(object).subscribe({
      next: () => {
        this.GetAllBranches();
        this.BranchForm.reset();
        this.closeModal?.nativeElement.click();
        this.toastr.success("تم إضافة الفرع بنجاح")
      }
    })

  }

  UpdateBranch(data: FormGroup) {
    if (this.BranchUpdateForm.invalid) return;
    let obj:updateBranch = {
      id: Number(this.currentID),
      name: this.BranchUpdateForm.value.Name,
    }

    this.branchService.updateBranch( obj,this.currentID).subscribe({
      next: () => {
        this.GetAllBranches();
      this.toastr.success("تم تعديل الفرع بنجاح")
  
      }
    })

  }

  changeStatus(id: number) {
   const Id = Number(id);
    this.branchService.updateBranchStatus(Id).subscribe({
      next: (data) => {       
      this.toastr.success("تم تعديل الحالة بنجاح")
   
        this.GetAllBranches();
      }
    })
  }

  DeleteBranch() {

    this.branchService.delete(Number(this.currentID)).subscribe({
      next: (data) => {
        this.GetAllBranches();
      }
    })
  }

  onPageChanged(event: any)
  {
    if (this.branchParams.pageNumper !== event.page)
    {
      this.branchParams.pageNumper = event.page;
      this.GetAllBranches();

      }
  }

  onSearch() {
    this.branchParams.search = this.searchTerms?.nativeElement.value;
    this.branchParams.pageNumper = 1;
    this.GetAllBranches();
  }
  onReset() {
    if (this.searchTerms)
      this.searchTerms.nativeElement.value = ""
    this.branchParams = new Params();
    this.GetAllBranches();
  }
  onSort(){
    this.isDesc=!this.isDesc;
    this.branchParams.sort=this.isDesc?'Desc':''
    this.GetAllBranches();
  }
  onPageSizeChange(event:any){
    const pageSize=parseInt(event.target.value)
    if (pageSize > 0 && pageSize < 50){
      this.branchParams.pageSize=pageSize
      this.GetAllBranches()
    }
  }



}
