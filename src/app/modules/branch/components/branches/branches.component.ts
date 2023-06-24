import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { catchError, of, tap } from 'rxjs';
import { addBranch, getAllBranch, updateBranch } from 'src/app/modules/shared/models/Branch';
import { Params } from 'src/app/modules/shared/models/Params';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { BranchService } from 'src/app/modules/shared/services/branch.service';
import { MyToastrService } from 'src/app/modules/shared/services/my-toastr.service';
import { NavTitleService } from 'src/app/modules/shared/services/nav-title.service';
@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent {
  @ViewChild('addModal') addModal: BsModalRef | undefined;
  @ViewChild('updateModal') updateModal: BsModalRef | undefined;
  @ViewChild('deleteModal') deleteModal: BsModalRef | undefined;
  @ViewChild('search') searchTerms?: ElementRef;
  branches: getAllBranch[] = [];
  branchParams = new Params;
  totalCount = 0;
  isDesc:boolean=false
  constructor(private branchService: BranchService,
    private myToastrService:MyToastrService,
    private toastr:MyToastrService,
    private navTitleService: NavTitleService,
    private authService: AuthService) { }
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
    this.navTitleService.title.next('الفروع')
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
        this.toastr.success("تم إضافة الفرع بنجاح")
        this.addModal!.hide();
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
      this.updateModal!.hide();
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

  

  hasPermission(action: string)
  {
    return this.authService.hasPermission(1,action);
  }  


  DeleteBranch() {
    this.branchService.delete(Number(this.currentID)).pipe(
      tap((response:any) => {
        
        if (response['message'] === "Branch Deleted Successfully") {
          this.toasterSuccess();
          this.deleteModal!.hide();
          this.GetAllBranches();
        }
        else if (response['message'] === "Delete Employee First") {
          this.deleteModal!.hide();
          this.toasterError();
        }
      }),
      catchError((error) => {
        console.error('API request error:', error);
        return of(null);
      })
    ).subscribe();
  
  }
  toasterSuccess(){
    this.myToastrService.success("تم حذف الفرع بنجاح");
  }
  toasterError(){
    this.myToastrService.error("لا يمكن حذف فرع يوجد به موظفين");
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
