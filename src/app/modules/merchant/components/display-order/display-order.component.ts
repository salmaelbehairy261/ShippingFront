import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/modules/shared/services/order.service';

@Component({
  selector: 'app-display-order',
  templateUrl: './display-order.component.html',
  styleUrls: ['./display-order.component.css']
})
export class DisplayOrderComponent implements OnInit {

  orderId:any;
  orderData:any=[];
  constructor(private orderService: OrderService, private activeRoute: ActivatedRoute){}
  ngOnInit(): void {
    this.DisplayOrderById();
  }

  DisplayOrderById(): void {
    this.orderId = this.activeRoute.snapshot.params['id'];
    this.orderService.GetAllDataById(this.orderId).subscribe((res) => {
    this.orderData=res;
    console.log(this.orderData)
    })
  }

  Print()
  {
    window.print();
  }
}
