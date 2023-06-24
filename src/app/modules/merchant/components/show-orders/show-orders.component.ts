import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NavTitleService } from 'src/app/modules/shared/services/nav-title.service';
import { OrderService } from 'src/app/modules/shared/services/order.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as XLSX from 'xlsx';


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
  orderStatusNow: number =0
  searchText: string = "";
  orderId: any;

  constructor(private orderService: OrderService,
    private activeRoute: ActivatedRoute,
    private navTitleService: NavTitleService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.statusId = +params['id'];
      this.orderStatusNow=this.statusId
      this.navTitleService.title.next('عرض الطلبات')
      this.countOfTotalOrders(this.searchText);
      this.fetchOrders(this.searchText, this.pageNumber, this.pageSize);
    })
  }


  fetchOrders(searchText: string, pageNumber: any, pageSize: any): void {
    this.orderService.GetOrdersForMerchant(searchText, this.statusId, pageNumber, pageSize).subscribe((res) => {
      this.CurrentOrders = res;
    })
  }

  countOfTotalOrders(searchText: string): void {
    this.statusId = this.activeRoute.snapshot.params['id'];

    this.orderService.GetCountOrdersForMerchant(searchText, this.statusId).subscribe((res) => {
      this.count = Number(res);
    })
  }

  onTableDataChange(event: any) {
    this.pageNumber = event;
    this.fetchOrders(this.searchText, this.pageNumber, this.pageSize);
  }

  onTableSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.pageNumber = 1;
    this.fetchOrders(this.searchText, this.pageNumber, this.pageSize);
  }
  Search(event: any) {
    this.searchText = event.target.value;
    this.fetchOrders(this.searchText, this.pageNumber, this.pageSize);
    this.countOfTotalOrders(this.searchText);
  }

  //modal
  closeResult: string = '';

  open(content: any, orderId: any) {
    this.orderId = orderId
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
      return `with: ${reason}`;
    }
  }

  DeleteOrder() {
    this.orderService.deleteOrder(this.orderId).subscribe(()=>{
      this.countOfTotalOrders(this.searchText);
      this.fetchOrders(this.searchText, this.pageNumber, this.pageSize);
    })

  }
  exportToExcel(): void {
    const element = document.getElementById('tableId');
    const worksheet = XLSX.utils.table_to_sheet(element);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'الطلبات.xlsx');
  }
}
