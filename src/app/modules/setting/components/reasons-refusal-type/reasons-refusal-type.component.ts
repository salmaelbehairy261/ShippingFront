import { Component, OnInit } from '@angular/core';
import { ReasonsRefusalServiceService } from '../../../shared/services/reasons-refusal-service.service';
import { MyToastrService } from 'src/app/modules/shared/services/my-toastr.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReasonsRefusalTypeUpdate } from '../../../shared/models/ReasonsRefusalTypeUpdate';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReasonsRefusalTypeAdd } from 'src/app/modules/shared/models/ReasonsRefusalType';
import { NavTitleService } from 'src/app/modules/shared/services/nav-title.service';
import { AuthService } from 'src/app/modules/shared/services/auth.service';

@Component({
  selector: 'app-reasons-refusal-type',
  templateUrl: './reasons-refusal-type.component.html',
  styleUrls: ['./reasons-refusal-type.component.css']
})
export class ReasonsRefusalTypeComponent implements OnInit{

  constructor(private reasonsRefusalTypeService:ReasonsRefusalServiceService,
    private modalService: NgbModal,
    private toastr:MyToastrService,
    private navTitleService: NavTitleService,
   private authService:AuthService,) { }
  reasonsRefusalTypes:any;

  ngOnInit():void{
    this.navTitleService.title.next("اسباب الرفض")
    this.getAllReasonRefusal();
  }

  getAllReasonRefusal(){
    this.reasonsRefusalTypeService.getAllReasonsRefusalTypes().subscribe(res=>this.reasonsRefusalTypes=res);
  }


  hasPermission(action: string)
  {
    return this.authService.hasPermission(10,action);
  } 
  idToDelete:number=0;
  GetCurrentId(id:number){
    this.idToDelete=id;
  }
  deleteReasonRefusal(){
    this.reasonsRefusalTypeService.DeleteReasonsRefusalType(this.idToDelete).subscribe(res=>{
      this.getAllReasonRefusal()
    });
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
    this.UpdateReasonRefusalForm.patchValue({
      id:this.ReasonRefusalTypeToUpdate.id.toString(),
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
    nameForAdd:new FormControl('',[Validators.required])
  });

  get getName(){
    return this.AddReasonRefusalForm.controls["nameForAdd"];
  }





  AddReasonRefusal(){
    if (this.AddReasonRefusalForm.status=="VALID")
      {
        const body:ReasonsRefusalTypeAdd ={
          name:String(this.AddReasonRefusalForm.value.nameForAdd)
        };
        this.reasonsRefusalTypeService.addReasonsRefusalType(body).subscribe(res => {
          this.toastr.success("تم اضافة سبب الرفض بنجاح")
          this.flag=false;
          this.modalService.dismissAll("saved");
          this.getAllReasonRefusal();
          this.AddReasonRefusalForm.reset()
        });
      }
      else{
        this.flag=true;
      }
  }

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
    if (this.UpdateReasonRefusalForm.controls["name"].value === this.ReasonRefusalTypeToUpdate.name)
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
        this.reasonsRefusalTypeService.updateReasonsRefusalType(body).subscribe(res => {
          this.toastr.success("تم تعديل سبب الرفض بنجاح")
          this.flag2=false;
          this.modalService.dismissAll("saved");
          this.getAllReasonRefusal()
        });
        }
  }
}
