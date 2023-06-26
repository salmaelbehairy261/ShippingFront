import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Params } from 'src/app/modules/shared/models/Params';
import { getAllRepresentative } from 'src/app/modules/shared/models/Representative';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { NavTitleService } from 'src/app/modules/shared/services/nav-title.service';
import { RepresentativeService } from 'src/app/modules/shared/services/representative.service';

@Component({
  selector: 'app-representative-table',
  templateUrl: './representative-table.component.html',
  styleUrls: ['./representative-table.component.css']
})
export class RepresentativeTableComponent implements OnInit {
  @ViewChild('search') searchTerms?: ElementRef;
   @ViewChild('deleteModal') deleteModal: BsModalRef | undefined;
  representatives: getAllRepresentative[] = [];
  representativeParams= new Params();
  totalCount = 0;
  isDesc: boolean = false;
  selecteduser: getAllRepresentative | null = null;
  constructor(
  private authService:AuthService,
    private representativeService: RepresentativeService,
    private router: Router,
    private navTitleService:NavTitleService
  ) { }
   ngOnInit(): void {
    this.navTitleService.title.next('المناديب')
     this.loadRepresentative();
     
  }


  loadRepresentative() {
    this.representativeService.GetRepresentatives(this.representativeParams).subscribe((response) => {
      this.representatives = response.data;

       this.representativeParams.pageNumper = response.pageIndex;
    this.representativeParams.pageSize = response.pageSize;
      this.totalCount = response.pageCount;

    });
  }

 hasPermission(action: string)
  {
    return this.authService.hasPermission(5,action);
  }  
  editRepresentative(representativeId: string) {

    this.router.navigate(['/employee/users/UpdateRepresentative', representativeId]);
  }
  addRepresentative() {

    this.router.navigate(['/employee/users/AddRepresentative']);
  }
  toggleDelete() {
    if (this.selecteduser) {
      const representative = this.selecteduser;
      if (representative.isDeleted) {
        return;
      }
      this.representativeService.Delete(representative.id).subscribe(() => {
        representative.isDeleted = true;
        this.deleteModal?.hide()

      });
    }

  }

  onPageChanged(event: any)
  {
    if (this.representativeParams.pageNumper !== event.page)
    {
      this.representativeParams.pageNumper = event.page;
      this.loadRepresentative();

      }
  }

  onSearch() {
    this.representativeParams.search = this.searchTerms?.nativeElement.value;
    this.representativeParams.pageNumper = 1;
    this.loadRepresentative();
  }
  onReset() {
    if (this.searchTerms)
      this.searchTerms.nativeElement.value = ""
    this.representativeParams = new Params();
    this.loadRepresentative();
  }
  onSort(){
    this.isDesc=!this.isDesc;
    this.representativeParams.sort=this.isDesc?'Desc':''
    this.loadRepresentative();
  }
  onPageSizeChange(event:any){
    const pageSize=parseInt(event.target.value)
    if (pageSize > 0 && pageSize < 50){
      this.representativeParams.pageSize=pageSize
      this.loadRepresentative()
    }
  }
}
