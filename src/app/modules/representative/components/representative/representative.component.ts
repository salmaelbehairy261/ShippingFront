import { NavTitleService } from './../../../shared/services/nav-title.service';
import { OrderService } from 'src/app/modules/shared/services/order.service';
import { Component } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Order } from 'src/app/modules/shared/models/Order';
import { MyToastrService } from 'src/app/modules/shared/services/my-toastr.service';
import { ActivatedRoute } from '@angular/router';
import { ReasonsRefusalServiceService } from 'src/app/modules/shared/services/reasons-refusal-service.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-representative',
  templateUrl: './representative.component.html',
  styleUrls: ['./representative.component.css']
})
export class RepresentativeComponent {
  CurrentOrders: any;
  pageNumber: number = 1;
  count: number = 0;
  pageSize: number = 8;
  tableSizes: any = [8, 16, 30, 50];
  searchText:any="";
  orderId:any;
  statusId:any;
  StatusNamesExpectNewPendingAndReject:any=this.orderService.StatusNamesExpectNewPendingAndReject;
  reasonFlag=false;
  reasonsRefusalTypes:any=[];
  orderStatusNow:number=this.activeRoute.snapshot.params['id'];
  constructor(
    private orderService:OrderService,
    private modalService: NgbModal,
    private activeRoute: ActivatedRoute,
    private toastr:MyToastrService,
    private reasonsRefusalTypeService:ReasonsRefusalServiceService,
    private navTitleService:NavTitleService) { }

  ngOnInit(): void {

     this.activeRoute.params.subscribe(params => {
      this.statusId = +params['id'];
      this.navTitleService.title.next('عرض الطلبات')
      this.countOfTotalOrders(this.searchText);
      this.fetchOrders(this.searchText, this.pageNumber, this.pageSize);
    })
  }


   //Pagination
   countOfTotalOrders(searchText:string): void {

    this.orderService.GetCountOrdersForRepresentative(searchText,this.statusId).subscribe((res) => {
      this.count=Number(res)
    })
  }

  fetchOrders(searchText:string,pageNumber:any,pageSize:any): void {

    this.orderService.GetOrdersForRepresentative(searchText,this.statusId,pageNumber,pageSize).subscribe((res) => {
      this.CurrentOrders = res;
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

 //modal
 closeResult: string = '';

 open(content:any,orderId:any) {
   this.orderId=orderId
   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
     this.closeResult = `Closed with: ${result}`;
   }, (reason) => {
     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
   });
 }

 private getDismissReason(reason: any): string {
   if (reason === ModalDismissReasons.ESC) {
     return 'by pressing ESC';
   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
     return 'by clicking on a backdrop';
   } else {
     return  `with: ${reason}`;
   }
 }

 ChangeStatusAndReasonRefusal()
 {
   var SelectedItem = (document.getElementById("ddlneworder")) as HTMLSelectElement;
   const status= SelectedItem.options[SelectedItem.selectedIndex].value;

   var SelectedItem = (document.getElementById("ddlreason")) as HTMLSelectElement;
   if(!Number(SelectedItem?.options[SelectedItem.selectedIndex]?.value)){var reasonRefusal = -1}
   else{ var reasonRefusal=Number(SelectedItem?.options[SelectedItem.selectedIndex]?.value)}

   this.orderService.ChangeStatusAndReasonRefusal(this.orderId,status,reasonRefusal).subscribe((res)=>{
    this.toastr.success("تم تغيير الحالة بنجاح");
    this.countOfTotalOrders(this.searchText);
    this.fetchOrders(this.searchText,this.pageNumber,this.pageSize);

  })
 }

 IsSelectReason(event:any)
 {
    const status=event.target.value;
    this.reasonFlag=false;
    if(Number(status)==8||Number(status)==9)
    {
      this.reasonFlag=true;
      this.reasonsRefusalTypeService.getAllReasonsRefusalForRep().subscribe((res)=>this.reasonsRefusalTypes=res);
      //console.log(this.reasonsRefusalTypes)
    }
 }
 exportToExcel(): void {
  const element = document.getElementById('tableId');
  const worksheet = XLSX.utils.table_to_sheet(element);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  XLSX.writeFile(workbook, 'الطلبات.xlsx');
}
}
