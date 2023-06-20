import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from 'src/app/modules/shared/services/order.service';

@Component({
  selector: 'app-show-orders',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.css']
})
export class ShowOrdersComponent implements OnInit{
  CurrentOrders: any;
  pageNumber: number = 1;
  count: number = 0;
  pageSize: number = 8;
  tableSizes: any = [8, 16, 30, 50];
  statusId: number = 0;
  orderStatusNow:number=this.activeRoute.snapshot.params['id'];
  searchText:string="";
  StatusNames:any=this.employeeOrdersService.StatusNames;
  StatusNamesExpectNewPendingAndReject:any=this.employeeOrdersService.StatusNamesExpectNewPendingAndReject;
  listRepresentative:any=[];
  orderId:any;
  selectedStatus: number = 0;

  constructor(private modalService: NgbModal,private employeeOrdersService: OrderService, private activeRoute: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.countOfTotalOrders(this.searchText);
    this.fetchOrders(this.searchText,this.pageNumber,this.pageSize);
  }

  //Pagination
  countOfTotalOrders(searchText:string): void {
    this.statusId = this.activeRoute.snapshot.params['id'];

    this.employeeOrdersService.GetCountOrdersForEmployee(searchText,this.statusId).subscribe((res) => {
      this.count=Number(res);

    })
  }

  fetchOrders(searchText:string,pageNumber:any,pageSize:any): void {
    this.activeRoute.params.subscribe(params => {
      this.statusId = +params['id'];
      this.employeeOrdersService.GetOrdersForEmployee(searchText,this.statusId,pageNumber,pageSize).subscribe((res) => {
      this.CurrentOrders = res;
      })
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
    this.orderId=orderId;
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


  ChangeOrderStatus()
  {
    var SelectedItem = (document.getElementById("ddlneworder")) as HTMLSelectElement;
    const status= SelectedItem.options[SelectedItem.selectedIndex].value;
    this.employeeOrdersService.ChangeOrderStatus(this.orderId,status)

    this.countOfTotalOrders(this.searchText);
    this.fetchOrders(this.searchText,this.pageNumber,this.pageSize);
  }

  //Representative
  DropdownListRepresentative()
  {
    this.employeeOrdersService.DropdownListRepresentative(this.orderId).subscribe((res) => {
      this.listRepresentative = res;
    })
  }

  SaveSelectedRepresentative()
  {
    var SelectedItem = (document.getElementById("ddlneworder")) as HTMLSelectElement;
    const representativeId= SelectedItem.options[SelectedItem.selectedIndex].value;
    this.employeeOrdersService.SelectRepresentative(this.orderId,representativeId);
   // window.location.reload();//xxxxxx
  }

}
