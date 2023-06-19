import { Component, OnInit } from '@angular/core';
import { ShippingTypeService } from '../../../shared/services/shipping-type.service';
import { shippingTypeAdd } from '../../../shared/models/shippingTypeAdd';
import { shippingTypeUpdate } from '../../../shared/models/shippingTypeUpdate';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyToastrService } from 'src/app/modules/shared/services/my-toastr.service';
import { shippingType } from '../../../shared/models/shippingType';



@Component({
  selector: 'app-shipping-type',
  templateUrl: './shipping-type.component.html',
  styleUrls: ['./shipping-type.component.css']
})
export class ShippingTypeComponent implements OnInit{

  constructor(private shippingTypeService:ShippingTypeService,private modalService: NgbModal,private myToastrService:MyToastrService) {  }
  shippingTypes:any;

  ngOnInit():void{
    this.shippingTypeService.getAllShippingTypes().subscribe(res=>this.shippingTypes=res);
  }

 
  addShippingType(shippingType:shippingTypeAdd){
    this.shippingTypeService.addShippingType(shippingType).subscribe(err=>console.log(err));
  }

  updateShippingType(shippingType:shippingTypeUpdate){
    this.shippingTypeService.updateShippingType(shippingType).subscribe(err=>console.log(err));
  }
  //toggle status
  toggleStatus(id:number){
    this.shippingTypeService.toggleShippingTypeStatus(id).subscribe();
  }
  delete(id:number){
    this.shippingTypeService.DeleteShippingType(id).subscribe();
    this.ngOnInit()
  }
  //modal
  closeResult = '';
  openAddingForm(content:any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

  shippingTypeToUpdate:shippingType={id:0,name:"",cost:0,isDeleted:false,status:false}
  openUpdateForm(content:any,item:shippingType) {
    this.shippingTypeToUpdate=item;
    //console.log(this.shippingTypeToUpdate);
    this.UpdateShippingTypeForm.patchValue({
      Name:this.shippingTypeToUpdate.name,
      Cost:this.shippingTypeToUpdate.cost.toString()
    })
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
    this.resetFlag();
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}
  //
  //

  
  //add form
  flag: boolean = false;
 
  AddShippingTypeForm=new FormGroup({
    Name:new FormControl('',[Validators.required]),
    Cost:new FormControl('',[Validators.required])
  });

  get getName(){
    return this.AddShippingTypeForm.controls["Name"];
  }

  get getCost(){
    return this.AddShippingTypeForm.controls["Cost"];
  }

  
  

  AddShippingType(){
    if (this.AddShippingTypeForm.status=="VALID")
      {
        const body:shippingTypeAdd ={
          Name:String(this.AddShippingTypeForm.value.Name),
          Cost:Number(this.AddShippingTypeForm.value.Cost)
        };
        //console.log(body);
        this.shippingTypeService.addShippingType(body).subscribe(err=>console.log(err));
        this.flag=false;
        this.modalService.dismissAll("saved");
        this.ngOnInit();
        this.myToastrService.success("تمت اضافه نوع الشحن بنجاح");
      }
      else{
        this.flag=true;
      }
  }

  //


  //update Form 

  flag2: boolean = false;


  UpdateShippingTypeForm=new FormGroup({
    Name:new FormControl(''),
    Cost:new FormControl('')
  });

  
  get getUpdateFormName(){
    return this.UpdateShippingTypeForm.controls["Name"];
  }

  get getUpdateFormCost(){
    return this.UpdateShippingTypeForm.controls["Cost"];
  }
  requireOneControl() {
    if (this.UpdateShippingTypeForm.controls["Name"].value === this.shippingTypeToUpdate.name && this.UpdateShippingTypeForm.controls["Cost"].value === String(this.UpdateShippingTypeForm.value.Cost)) 
    {
      this.flag2=true;
    }
    else{
      this.flag2=false;
    }
    //console.log(this.flag2)
  }
  resetFlag(){
    this.flag2=false;
  }
  UpdateShippingType(){
    this.requireOneControl();
    if (!this.flag2)
      {
        let shippingName:string="";
        let shippingCost:number=0;
        if(String(this.UpdateShippingTypeForm.value.Name)==shippingName)
        {
          shippingName=this.shippingTypeToUpdate.name;
        }
        else{
          shippingName=String(this.UpdateShippingTypeForm.value.Name);
        }
        if(Number(this.UpdateShippingTypeForm.value.Cost)==shippingCost)
        {
          shippingCost=this.shippingTypeToUpdate.cost;
        }
        else{
          shippingCost=Number(this.UpdateShippingTypeForm.value.Cost);
        }
        const body:shippingTypeUpdate ={
          id:this.shippingTypeToUpdate.id,
          Name:shippingName,
          Cost:shippingCost
        };
        this.flag2=false;
        this.shippingTypeService.updateShippingType(body).subscribe(err=>console.log(err));
        this.modalService.dismissAll("saved");
        this.ngOnInit()
        this.myToastrService.success("تمت تعديل نوع الشحن بنجاح");
        }
  }
}
