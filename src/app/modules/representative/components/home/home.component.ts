import { Component,OnInit } from '@angular/core';
import { NavTitleService } from 'src/app/modules/shared/services/nav-title.service';
import { OrderService } from 'src/app/modules/shared/services/order.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  countOfOrders: any;
  StatusNames:any=this.orderService.StatusNamesExpectNewPendingAndRejectRepresentative;

  constructor(
    private orderService:OrderService,
    private navTitleService:NavTitleService) { }

  ngOnInit(): void {
    this.navTitleService.title.next('الرئيسية')
    this.countOfOrders=[0,0,0,0,0,0,0,0]
    this.orderService.CountOrdersForRepresentativeByStatus().subscribe((res) => {
      this.countOfOrders = res;
    })
  }
}