import { NavTitleService } from 'src/app/modules/shared/services/nav-title.service';
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { getAllMerchants } from "src/app/modules/shared/models/Merchant";
import { Params } from "src/app/modules/shared/models/Params";
import { MerchantService } from "src/app/modules/shared/services/merchant.service";



@Component({
  selector: 'app-marchant-table',
  templateUrl: './marchant-table.component.html',
  styleUrls: ['./marchant-table.component.css']
})
export class MarchantTableComponent implements OnInit {

  @ViewChild('search') searchTerms?: ElementRef;
  marchants: getAllMerchants[] = [];
  merchantParams = new Params();
  totalCount = 0;
  isDesc:boolean=false
  constructor(
    private merchantService: MerchantService,
    private router: Router,
    private navTitleService:NavTitleService) { }
  ngOnInit(): void {
    this.loadMerchants();
    this.navTitleService.title.next('التجار')
  }


  loadMerchants() {
    this.merchantService.GetMerchants(this.merchantParams).subscribe((response) => {
    this.marchants = response.data;
    this.merchantParams.pageNumper = response.pageIndex;
    this.merchantParams.pageSize = response.pageSize;
    this.totalCount=response.pageCount

    });
  }


  editMerchant(merchantId: string) {

    this.router.navigate(['/employee/users/UpdateMerchant', merchantId]);
  }
  addMerchant() {

    this.router.navigate(['/employee/users/AddMerchant']);
  }
  toggleDelete(merchant: getAllMerchants) {
    if (merchant.isDeleted) {
      return;
    }
    this.merchantService.Delete(merchant.id).subscribe(() => {
      merchant.isDeleted = true;
    });


  }


    onPageChanged(event: any)
  {
    if (this.merchantParams.pageNumper !== event.page)
    {
      this.merchantParams.pageNumper = event.page;
      this.loadMerchants();

      }
  }

  onSearch() {
    this.merchantParams.search = this.searchTerms?.nativeElement.value;
    this.merchantParams.pageNumper = 1;
    this.loadMerchants();
  }
  onReset() {
    if (this.searchTerms)
      this.searchTerms.nativeElement.value = ""
    this.merchantParams = new Params();
    this.loadMerchants();
  }
  onSort(){
    this.isDesc=!this.isDesc;
    this.merchantParams.sort=this.isDesc?'Desc':''
    this.loadMerchants()
  }

  onPageSizeChange(event:any){
    const pageSize=parseInt(event.target.value)
    if (pageSize > 0 && pageSize < 50){
      this.merchantParams.pageSize=pageSize
      this.loadMerchants()
    }
  }
}
