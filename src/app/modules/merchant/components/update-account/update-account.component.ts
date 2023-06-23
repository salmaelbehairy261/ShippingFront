import { MerchantService } from './../../../shared/services/merchant.service';
import { Component, OnInit } from '@angular/core';
import { MyToastrService } from 'src/app/modules/shared/services/my-toastr.service';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css']
})
export class UpdateAccountComponent implements OnInit {
 
  constructor( private toaster:MyToastrService,private merchantService:MerchantService) {
    
    
  }
  
  ngOnInit(): void {
   
  }

}
