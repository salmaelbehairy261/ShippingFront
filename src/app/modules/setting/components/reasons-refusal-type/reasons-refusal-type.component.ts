import { Component, OnInit } from '@angular/core';
import { ReasonsRefusalServiceService } from '../../../shared/services/reasons-refusal-service.service';
import { MyToastrService } from 'src/app/modules/shared/services/my-toastr.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReasonsRefusalTypeUpdate } from '../../../shared/models/ReasonsRefusalTypeUpdate';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReasonsRefusalTypeAdd } from 'src/app/modules/shared/models/ReasonsRefusalType';

@Component({
  selector: 'app-reasons-refusal-type',
  templateUrl: './reasons-refusal-type.component.html',
  styleUrls: ['./reasons-refusal-type.component.css']
})
export class ReasonsRefusalTypeComponent implements OnInit{

  constructor(private reasonsRefusalTypeService:ReasonsRefusalServiceService,private modalService: NgbModal,private myToastrService:MyToastrService) {  }
  reasonsRefusalTypes:any;

  ngOnInit():void{
    this.reasonsRefusalTypeService.getAllReasonsRefusalTypes().subscribe(res=>this.reasonsRefusalTypes=res);
  }

  addReasonRefusal(reasonsRefusalType:ReasonsRefusalTypeAdd){
    this.reasonsRefusalTypeService.addReasonsRefusalType(reasonsRefusalType)
  }

  updateReasonRefusal(reasonsRefusalType:ReasonsRefusalTypeUpdate){
    this.reasonsRefusalTypeService.updateReasonsRefusalType(reasonsRefusalType)
  }

  deleteReasonRefusal(item:ReasonsRefusalTypeUpdate){
    this.reasonsRefusalTypeService.DeleteReasonsRefusalType(item.id).subscribe();
    window.location.reload();
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
///////////////////////////////////////////
  ReasonRefusalTypeToUpdate:ReasonsRefusalTypeUpdate={id:0,name:""}
  openUpdateForm(content:any,item:ReasonsRefusalTypeUpdate) {
    this.ReasonRefusalTypeToUpdate=item;
    //console.log(this.shippingTypeToUpdate);
    this.UpdateReasonRefusalForm.patchValue({
      id:this.ReasonRefusalTypeToUpdate.name,
      name:this.ReasonRefusalTypeToUpdate.name.toString()
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
 
  AddReasonRefusalForm=new FormGroup({
    name:new FormControl('',[Validators.required])
  });

  get getName(){
    return this.AddReasonRefusalForm.controls["name"];
  }


  
  

  AddReasonRefusal(){
    if (this.AddReasonRefusalForm.status=="VALID")
      {
        const body:ReasonsRefusalTypeAdd ={
          name:String(this.AddReasonRefusalForm.value.name)
        };
        //console.log(body);
        this.addReasonRefusal(body);
        this.flag=false;
        window.location.reload();
        this.myToastrService.success("تمت اضافه نوع الشحن بنجاح");
      }
      else{
        this.flag=true;
      }
  }

  submit(e:any){e.e.preventDefault();}
  //


  //update Form 

  flag2: boolean = false;


  UpdateReasonRefusalForm=new FormGroup({
    id:new FormControl(''),
    name:new FormControl('')
  });

  
  get getUpdateFormName(){
    return this.UpdateReasonRefusalForm.controls["name"];
  }


  requireOneControl() {
    if (this.UpdateReasonRefusalForm.controls["name"].value === String(this.UpdateReasonRefusalForm.value.name)) 
    {
      this.flag2=true;
    }
    else{
      this.flag2=false;
    }
  }
  resetFlag(){
    this.flag2=false;
  }
  UpdateReasonRefusal(){
    this.requireOneControl();
    if (!this.flag2)
      {
        let reasonRefusalName:string="";
        if(String(this.UpdateReasonRefusalForm.value.name)==reasonRefusalName)
        {
          reasonRefusalName=this.ReasonRefusalTypeToUpdate.name;
        }
        else{
          reasonRefusalName=String(this.UpdateReasonRefusalForm.value.name);
        }

        const body:ReasonsRefusalTypeUpdate ={
          id:this.ReasonRefusalTypeToUpdate.id,
          name:reasonRefusalName
        };
        this.flag2=false;
        this.updateReasonRefusal(body);
        window.location.reload();
        this.myToastrService.success("تمت تعديل سبب الرفض بنجاح");
        }
  }
}