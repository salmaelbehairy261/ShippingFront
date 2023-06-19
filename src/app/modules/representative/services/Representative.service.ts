import { Injectable } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { MyToastrService } from '../../shared/services/my-toastr.service';
import { OrderStatus } from '../../shared/models/EnumStatus';

@Injectable({
  providedIn: 'root',
})

export class RepresentativeService {

  StatusNamesExpectNewPendingAndReject: any = [
    {name:"تم التسليم",value:OrderStatus.ClientDelivered},
    {name:"لا يمكن الوصول",value:OrderStatus.UnReachable},
    {name:"تم التاجيل",value:OrderStatus.Postponed},
    {name:"تم التسليم جزئيا",value:OrderStatus.PartiallyDelivered},
    {name:"تم الالغاء من قبل المستلم",value:OrderStatus.ClientCanceled},
    {name:"تم الرفض مع الدفع",value:OrderStatus.RejectWithPaying},
    {name:"رفض مع سداد جزء",value:OrderStatus.RejectWithPartialPaying},
  ]

    constructor(private apiService: ApiService,private toastr:MyToastrService) { }
    

    representativeId:string="7b111e3c-4f8a-4a3e-b58a-e91bf17b7cfe";

    GetOrdersForRepresentative(searchText:string,pageNumber:any,pageSize:any) {
        const url = `Order/GetOrdersForRepresentative?searchText=${searchText}&representativeId=${this.representativeId}&pageNubmer=${pageNumber}&pageSize=${pageSize}`;
       return this.apiService.get(url);
      }
    
      GetCountOrdersForRepresentative(searchText:string) {
        const url = `Order/GetCountOrdersForRepresentative?representativeId=${this.representativeId}&searchText=${searchText}`;
        return this.apiService.get(url);
      }

      ChangeOrderStatus(orderId:any,status:any) 
      {
        const url = `Order/ChangeStatus?orderId=${orderId}&status=${status}`;
        this.apiService.put(url,{orderId,status}).subscribe({
          
          next:(res:any)=>{
            this.toastr.success(
              "تم تغيير الحالة بنجاح"
              );
          },
          error:(err)=>{
            this.toastr.error('لم يتم التغيير');
          }
        })
    
      }

}