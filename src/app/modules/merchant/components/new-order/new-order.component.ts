import { PaymentType, orderType, Order, Product } from '../../../shared/models/Order';
import { GovernrateService } from '../../../shared/services/governrate.service';
import { BranchService } from '../../../shared/services/branch.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ShippingTypeService } from '../../../shared/services/shipping-type.service';
import { OrderService } from '../../../shared/services/order.service';
import { city } from '../../../shared/models/City';
import { shippingType } from '../../../shared/models/shipping-type';
import { governorateWithCities } from 'src/app/modules/shared/models/Governorate';
import { NavTitleService } from 'src/app/modules/shared/services/nav-title.service';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { branchList } from 'src/app/modules/shared/models/Branch';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderConfirmationComponent } from '../order-confirmation/order-confirmation.component';
import { MyToastrService } from 'src/app/modules/shared/services/my-toastr.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {
  constructor(
    private branchService: BranchService,
    private governorateService: GovernrateService,
    private shippingTypeService: ShippingTypeService,
    private orderService: OrderService,
    private fb: FormBuilder,
    private navTitleService:NavTitleService,
    private authService:AuthService,
    private modalService: NgbModal,
    private toastr:MyToastrService,
    private location:Location
  ) { }
  ngOnInit(): void {
    this.navTitleService.title.next('إضافة طلب')
    this.branchService.getBranches().subscribe(res => {
      this.branches = res
    })
    this.governorateService.GetGovernorateWithCityList().subscribe(res => {
      this.governorates = res
    })
    this.shippingTypeService.getshippingTypes().subscribe(res => {
      this.shippingTypes = res
    })
    this.addProduct()
  }
  cities: city[]=[]
  governorates: governorateWithCities[]=[]
  shippingTypes: shippingType[]=[]
  branches: branchList[]=[]
  productsArr:Product[]=[]
  isLastProduct=false
  selectedGov:any
  paymentTypes = [
    { name: 'الدفع عند الاستلام', value: PaymentType.payOnDelivery },
    { name: 'دفع مقدم', value: PaymentType.prepaid },
    { name: 'طرد مقابل طرد', value: PaymentType.packageForAPackage }
  ];
  orderTypes = [
    { name: 'الاستلام من الفرع', value: orderType.ReceiveFromTheBranch },
    { name: 'الاستلام من التاجر', value: orderType.ReceiveFromTheTrader }
  ];
  orderForm = this.fb.group(
    {
      orderType: new FormControl('', [Validators.required]),
      paymentType: new FormControl('', [Validators.required]),
      clientName: new FormControl('', [Validators.required,Validators.pattern(/^[\u0600-\u06FF\u0750-\u077F\u0621-\u064Aa-zA-Z\s]+$/)]),
      firstPhoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^(010|011|012|015)\d{8}$/)]),
      secondPhoneNumber: new FormControl('', [Validators.pattern(/^(010|011|012|015)\d{8}$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      governorate: new FormControl('', [Validators.required]),
      city: new FormControl({ value: '', disabled: true }, [Validators.required]),
      street: new FormControl('', [Validators.required]),
      shippingType: new FormControl('', [Validators.required]),
      branch: new FormControl('', [Validators.required]),
      notes: new FormControl('', []),
      village: new FormControl(false, []),
      products: this.fb.array([])
    })
  orderInfo=true
  clientInfo=false
  productInfo=false
  notes=false
  showInfo(step:number){
    this.orderInfo=step==1
    this.clientInfo=step==2
    this.productInfo=step==3
    this.notes=step==4
  }
  selectGovernorate() {
    this.orderForm.controls['city'].enable()
    this.selectedGov=this.governorates.find((gov: any) => gov.id == this.orderForm.value.governorate!)
    this.cities = this.selectedGov.cities
  }
  get products() {
    return this.orderForm.controls["products"] as FormArray;
  }
  addProduct() {
    const product = this.fb.group({
      name: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      weight: new FormControl('', [Validators.required])
    });
    this.products.push(product);
  }
  remove(i:number){
    if(this.products.length==1)
    this.isLastProduct=true
    else
    this.products.removeAt(i);
  }
  addOrder() {
    this.productsArr=[]
    this.orderForm.value.products?.forEach((element:any)=>{
      this.productsArr.push({
        name:element.name,
        quantity:Number(element.quantity),
        weight:Number(element.weight),
        price:Number(element.price)
      })
    })
    const order:Order={
      MerchantId:this.authService.getUserId(),
      orderType:Number(this.orderForm.controls['orderType'].value),
      paymentType:Number(this.orderForm.controls['paymentType'].value),
      clientName:this.orderForm.controls['clientName'].value!,
      firstPhoneNumber:this.orderForm.controls['firstPhoneNumber'].value!,
      secondPhoneNumber:this.orderForm.controls['secondPhoneNumber'].value,
      email:this.orderForm.controls['email'].value!,
      governorateId:Number(this.orderForm.controls['governorate'].value),
      cityId:Number(this.orderForm.controls['city'].value),
      street:this.orderForm.controls['street'].value!,
      deliverToVillage:this.orderForm.controls['village'].value!,
      shippingTypeId:Number(this.orderForm.controls['shippingType'].value),
      branchId:Number(this.orderForm.controls['branch'].value),
      notes:this.orderForm.controls['notes'].value,
      products:this.productsArr
    }
    this.orderService.addOrder(order).subscribe(res => {
      const modalRef = this.modalService.open(OrderConfirmationComponent, {
        size: 'lg',
        centered: true,
      });
      modalRef.componentInstance.productCost =res.result.productTotalCost
      modalRef.componentInstance.shippingCost =res.result.orderShippingTotalCost
      modalRef.componentInstance.weight =res.result.totalWeight
      modalRef.componentInstance.message="تم إضافة الطلب بنجاح"
      modalRef.hidden.subscribe(()=>{
        this.toastr.success("تم إضافة الطلب بنجاح")
      window.location.reload()
      })
      console.log(res.result)
    });
    console.log(order)
  }
}
