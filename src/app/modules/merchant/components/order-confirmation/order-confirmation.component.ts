import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MyToastrService } from 'src/app/modules/shared/services/my-toastr.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent {
  constructor(private toastr:MyToastrService,private location:Location){}
  @Input() productCost:number=0
  @Input() shippingCost:number=0
  @Input() weight:number=0
  @Input() message=''
}
