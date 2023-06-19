import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Params } from 'src/app/modules/shared/models/Params';
import { getAllRepresentative } from 'src/app/modules/shared/models/Representative';
import { NavTitleService } from 'src/app/modules/shared/services/nav-title.service';
import { RepresentativeService } from 'src/app/modules/shared/services/representative.service';

@Component({
  selector: 'app-representative-table',
  templateUrl: './representative-table.component.html',
  styleUrls: ['./representative-table.component.css']
})
export class RepresentativeTableComponent implements OnInit {
  @ViewChild('search') searchTerms?: ElementRef;
  representatives: getAllRepresentative[] = [];
  representativeParams= new Params();
  totalCount = 0;
  isDesc:boolean=false
  constructor(

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
    this.totalCount=response.pageCount

    });
  }


  editRepresentative(representativeId: string) {

    this.router.navigate(['/employee/users/UpdateRepresentative', representativeId]);
  }
  addRepresentative() {

    this.router.navigate(['/employee/users/AddRepresentative']);
  }
  toggleDelete(representative: getAllRepresentative) {
    if (representative.isDeleted) {
      return;
    }
    this.representativeService.Delete(representative.id).subscribe(() => {
      representative.isDeleted = true;
    });


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
