import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NavTitleService } from 'src/app/modules/shared/services/nav-title.service';
import { OrderService } from 'src/app/modules/shared/services/order.service';

@Component({
  selector: 'app-show-orders',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.css']
})
export class ShowOrdersComponent {

  CurrentOrders: any;
  pageNumber: number = 1;
  count: number = 0;
  pageSize: number = 8;
  tableSizes: any = [8, 16, 30, 50];
  statusId: number = 0;
  AllOrders: any;
  orderStatusNow:number=this.activeRoute.snapshot.params['id'];
  searchText:string="";

  constructor(private orderService: OrderService,
     private activeRoute: ActivatedRoute,
     private navTitleService:NavTitleService
     ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.statusId = +params['id'];
      this.navTitleService.title.next('عرض الطلبات')
      this.countOfTotalOrders(this.searchText);
      this.fetchOrders(this.searchText,this.pageNumber,this.pageSize);
    })
  }


  fetchOrders(searchText:string,pageNumber:any,pageSize:any): void {
    this.orderService.GetOrdersForMerchant(searchText,this.statusId,pageNumber,pageSize).subscribe((res) => {
      this.CurrentOrders = res;
    })
  }

  countOfTotalOrders(searchText:string): void {
    this.statusId = this.activeRoute.snapshot.params['id'];

    this.orderService.GetCountOrdersForMerchant(searchText,this.statusId).subscribe((res) => {
      this.count=Number(res);
    })
  }

  onTableDataChange(event: any) {
    this.pageNumber = event;
    this.fetchOrders(this.searchText,this.pageNumber,this.pageSize);
  }

  onTableSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.pageNumber = 1;
    this.fetchOrders(this.searchText,this.pageNumber,this.pageSize);
  }
  Search(event:any)
  {
    this.searchText=event.target.value;
    this.fetchOrders(this.searchText,this.pageNumber,this.pageSize);
    this.countOfTotalOrders(this.searchText);
  }
}
