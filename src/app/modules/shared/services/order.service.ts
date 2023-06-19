import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Order, OrderToUpdate } from '../models/Order';
import { MyToastrService } from './my-toastr.service';
import { EMPTY, catchError, of } from 'rxjs';
import { ErrorMessageService } from './error-message.service';
import { OrderStatus } from '../models/EnumStatus';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url='Order'
  constructor(
    private apiService:ApiService,
    private toastr:MyToastrService,
    private errorMessageService:ErrorMessageService,
    private authService:AuthService
  ) { }
  public addOrder(order:Order){
    return this.apiService.post<any,Order>(this.url,order).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
    .subscribe(res => {
      this.toastr.success("تم إضافة الطلب بنجاح")
    });
  }
  public getOrderById(id:number){
    return this.apiService.get<OrderToUpdate>(`${this.url}/Get/${id}`).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }
  public updateOrder(order:OrderToUpdate){
    return this.apiService.put<any,OrderToUpdate>(this.url,order).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
    .subscribe(res=>{
      this.toastr.success("تم تحديث الطلب بنجاح")
    })
  }
  StatusNames: any = [
    "جديد",
    "قيد الانتظار",
    "تم التسليم للمندوب",
    "تم التسليم",
    "لا يمكن الوصول",
    "تم التاجيل",
    "تم التسليم جزئيا",
    "تم الالغاء من قبل المستلم",
    "تم الرفض مع الدفع",
    "رفض مع سداد جزء",
    "رفض من الموظف"
  ]

  StatusNamesExpectNewPendingAndReject: any = [
    {name:"تم التسليم",value:OrderStatus.ClientDelivered},
    {name:"لا يمكن الوصول",value:OrderStatus.UnReachable},
    {name:"تم التاجيل",value:OrderStatus.Postponed},
    {name:"تم التسليم جزئيا",value:OrderStatus.PartiallyDelivered},
    {name:"تم الالغاء من قبل المستلم",value:OrderStatus.ClientCanceled},
    {name:"تم الرفض مع الدفع",value:OrderStatus.RejectWithPaying},
    {name:"رفض مع سداد جزء",value:OrderStatus.RejectWithPartialPaying},
  ]
  CountOrdersForEmployeeByStatus() {
    const url = "Order/CountOrdersForEmployeeByStatus";
    return this.apiService.get(url);
  }

  GetOrdersForEmployee(searchText:string,statusId:any,pageNumber:any,pageSize:any) {
    const url = `Order/GetOrdersForEmployee?searchText=${searchText}&statusId=${statusId}&pageNubmer=${pageNumber}&pageSize=${pageSize}`;
   return this.apiService.get(url).pipe(
    catchError(error => {
      const err=this.errorMessageService.getServerErrorMessage(error);
      this.toastr.error(err);
      return EMPTY;
    })
  )
  }

  GetCountOrdersForEmployee(searchText:string,statusId: any) {
    const url = `Order/GetCountOrdersForEmployee?searchText=${searchText}&statusId=${statusId}`;
    return this.apiService.get(url).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }

  GetAllOrders(pageNumber:any,pageSize:any) {
    const url = `Order/GetAllOrder?pageNubmer=${pageNumber}&pageSize=${pageSize}`;
    return this.apiService.get(url).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }

  CountAll() {
    const url = `Order/CountAll`;
    return this.apiService.get(url).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }

  SearchByDateAndStatus(pageNumber:any,pageSize:any,fromDate:any, toDate:any,status:any) {
    const url = `Order/SearchByDateAndStatus?pageNubmer=${pageNumber}&pageSize=${pageSize}&fromDate=${fromDate}&toDate=${toDate}&status=${status}`;
    return this.apiService.get(url).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }

  CountOrdersByDateAndStatus(fromDate:any, toDate:any,status:any) {
    const url = `Order/CountOrdersByDateAndStatus?fromDate=${fromDate}&toDate=${toDate}&status=${status}`;
    return this.apiService.get(url).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }

  DropdownListRepresentative(orderId:any)
  {
    const url = `Order/DropdownListRepresentative?orderId=${orderId}`;
    return this.apiService.get(url).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }

  SelectRepresentative(orderId:any,representativeId:any)
  {
    const url = `Order/SelectRepresentative?orderId=${orderId}&representativeId=${representativeId}`;

    this.apiService.put(url,{orderId,representativeId}).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
    .subscribe((res:any)=>{
        this.toastr.success(
          "تم التسليم للمندوب بنجاح"
          );
      })
  }

  merchantId:string=this.authService.getUserId()

  CountOrdersForMerchantByStatus() {
    const url = `Order/CountOrdersForMerchantByStatus?id=${this.merchantId}`;
    return this.apiService.get(url).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }


  GetOrdersForMerchant(searchText:string,statusId:any,pageNumber:any,pageSize:any) {
    const url = `Order/GetOrdersForMerchant?searchText=${searchText}&merchantId=${this.merchantId}&statusId=${statusId}&pageNubmer=${pageNumber}&pageSize=${pageSize}`;
    return this.apiService.get(url).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }

  GetCountOrdersForMerchant(searchText:string,statusId: any) {
    const url = `Order/GetCountOrdersForMerchant?searchText=${searchText}&merchantId=${this.merchantId}&statusId=${statusId}`;
    return this.apiService.get(url).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }

  DeleteOrder(orderId:any) 
  {
    const url = `Order?orderId=${orderId}`;
   return this.apiService.delete<void>(url).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }
  
  GetAllDataById(id:any) {
    const url = `Order/GetAllDataById?id=${id}`;
    return this.apiService.get(url).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }

  StatusNamesExpectNewPendingAndRejectRep: any = [
    {name:"تم التسليم",value:OrderStatus.ClientDelivered},
    {name:"لا يمكن الوصول",value:OrderStatus.UnReachable},
    {name:"تم التاجيل",value:OrderStatus.Postponed},
    {name:"تم التسليم جزئيا",value:OrderStatus.PartiallyDelivered},
    {name:"تم الالغاء من قبل المستلم",value:OrderStatus.ClientCanceled},
    {name:"تم الرفض مع الدفع",value:OrderStatus.RejectWithPaying},
    {name:"رفض مع سداد جزء",value:OrderStatus.RejectWithPartialPaying},
  ]
    representativeId:string=this.authService.getUserId();
    GetOrdersForRepresentative(searchText:string,pageNumber:any,pageSize:any) {
        const url = `Order/GetOrdersForRepresentative?searchText=${searchText}&representativeId=${this.representativeId}&pageNubmer=${pageNumber}&pageSize=${pageSize}`;
      return this.apiService.get(url).pipe(
        catchError(error => {
          const err=this.errorMessageService.getServerErrorMessage(error);
          this.toastr.error(err);
          return EMPTY;
        })
      )
      }
      GetCountOrdersForRepresentative(searchText:string) {
        const url = `Order/GetCountOrdersForRepresentative?representativeId=${this.representativeId}&searchText=${searchText}`;
        return this.apiService.get(url).pipe(
          catchError(error => {
            const err=this.errorMessageService.getServerErrorMessage(error);
            this.toastr.error(err);
            return EMPTY;
          })
        )
      }
      ChangeOrderStatusRep(orderId:any,status:any)
      {
        const url = `Order/ChangeStatus?orderId=${orderId}&status=${status}`;
        this.apiService.put(url,{orderId,status}).pipe(
          catchError(error => {
            const err=this.errorMessageService.getServerErrorMessage(error);
            this.toastr.error(err);
            return EMPTY;
          })
        )
        .subscribe((res:any)=>{
            this.toastr.success(
              "تم تغيير الحالة بنجاح"
              );
          },
        )
  }
}
