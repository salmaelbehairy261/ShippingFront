import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/modules/shared/services/order.service';

@Component({
  selector: 'app-orders-count',
  templateUrl: './orders-count.component.html',
  styleUrls: ['./orders-count.component.css']
})
export class OrdersCountComponent implements OnInit {

  countOfOrders: any;
  StatusNames:any=this.statusService.StatusNames;

  constructor(private statusService: OrderService,
    private authService:AuthService) { }

  ngOnInit(): void {
    this.countOfOrders=[0,0,0,0,0,0,0,0,0,0,0]
    this.statusService.CountOrdersForEmployeeByStatus().subscribe((res) => {
      this.countOfOrders = res;
    })
  }

  hasPermission(action: string){
    return this.authService.hasPermission(7,action);
  }
}
