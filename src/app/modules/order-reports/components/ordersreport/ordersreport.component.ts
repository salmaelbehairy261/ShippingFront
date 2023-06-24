import { Component } from '@angular/core';
import { NavTitleService } from 'src/app/modules/shared/services/nav-title.service';
import { OrderService } from 'src/app/modules/shared/services/order.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-ordersreport',
  templateUrl: './ordersreport.component.html',
  styleUrls: ['./ordersreport.component.css']
})
export class OrdersreportComponent {
  CurrentOrders: any;
  AllOrders:any;
  pageNumber: number = 1;
  count: number = 0;
  pageSize: number = 8;
  tableSizes: any = [8, 16, 30, 50];
  statusId: number = 0;
  fromDate:any;
  toDate:any;
  statusSearch:any;
  isValid:boolean=false;
  StatusNames:any=this.ordersService.StatusNames;

  constructor(private ordersService: OrderService,private navTitleService:NavTitleService) { }

  ngOnInit(): void {
    this.navTitleService.title.next("تقارير الطلبات")
    this.countOfTotalOrders();
    this.fetchOrders(this.pageNumber,this.pageSize);
  }

  fetchOrders(pageNumber:any,pageSize:any): void {
    if(this.isValid)
    {
      this.ordersService.SearchByDateAndStatus(pageNumber,pageSize,this.fromDate,this.toDate,this.statusSearch).subscribe((res) => {
        this.CurrentOrders = res;
      })
    }
    else{
      this.ordersService.GetAllOrders(pageNumber,pageSize).subscribe((res) => {
        this.CurrentOrders = res;
      })
    }

  }
  countOfTotalOrders(): void {
    if(this.isValid)
    {
      this.ordersService.CountOrdersByDateAndStatus(this.fromDate,this.toDate,this.statusSearch).subscribe((res) => {
        this.count=Number(res);
      })
    }
    else{
    this.ordersService.CountAll().subscribe((res) => {
      this.count=Number(res);
    })
    }
  }
  onTableDataChange(event: any) {
    this.pageNumber = event;
    this.fetchOrders(this.pageNumber,this.pageSize);
  }
  onTableSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.pageNumber = 1;
    this.fetchOrders(this.pageNumber,this.pageSize);
  }

  
  IsValid()
  {
    if(this.fromDate!=undefined&&this.toDate!=undefined&&this.statusSearch!=undefined&& new Date(this.fromDate) < new Date(this.toDate))
    {
      this.isValid=true;
    }
    else
    {
      this.isValid=false;
    }
  }
  StatusSearch(event:any)
  {
    this.statusSearch=event.target.value;
  }
  SearchByDate()
  {
    this.fetchOrders(this.pageNumber,this.pageSize);
    this.countOfTotalOrders();
  }
  Reset()
  {
    this.isValid=false;
    this.countOfTotalOrders();
    this.fetchOrders(this.pageNumber,this.pageSize);
  }

  exportToExcel(): void {
    const element = document.getElementById('tableId');
    const worksheet = XLSX.utils.table_to_sheet(element);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, ' تقارير الطلبات.xlsx');
  }
}
