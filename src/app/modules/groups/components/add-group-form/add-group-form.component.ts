import { GroupService } from 'src/app/modules/shared/services/group.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Group, GroupPrivilageService, Permission } from 'src/app/modules/shared/models/Group';
import { MyToastrService } from 'src/app/modules/shared/services/my-toastr.service';
import { Location } from '@angular/common';
import { NavTitleService } from 'src/app/modules/shared/services/nav-title.service';


@Component({
  selector: 'app-add-group-form',
  templateUrl: './add-group-form.component.html',
  styleUrls: ['./add-group-form.component.css']
})
export class AddGroupFormComponent implements OnInit{

  constructor(private toaster:MyToastrService ,
    private groupService:GroupService ,
    private location:Location,
    private navTitleService:NavTitleService) {}
  groupPrivilagesArr:any;
  ngOnInit(): void {
    this.navTitleService.title.next("اضافة مجموعة")
    const groupsPrivilages:GroupPrivilageService=new GroupPrivilageService();
    this.groupPrivilagesArr=groupsPrivilages.Privilages;
  }

  AddAction:string="Add";
  ShowAction:string="Show";
  EditAction:string="Edit";
  DeleteAction:string="Delete";

  ////////handling permissions Array
  AllGroupPrivilages: Permission[] = [];

  AddOrRemovePermission(id:number,action:string){
    if(id==10)
    {
      let ObjectsToAddOrRemove: Permission[] = [];
      for (let index = 0; index < 4; index++) {
        const newPermmision :Permission=new Permission();
        newPermmision.permissionId=id+index;
        newPermmision.action=action;
        ObjectsToAddOrRemove.push(newPermmision);
      }

      this.AllGroupPrivilages=this.checkAndModifyArray(this.AllGroupPrivilages,ObjectsToAddOrRemove);
    }
    else
    {
      const index = this.AllGroupPrivilages.findIndex(g =>g.permissionId===id && g.action === action );
      if (index === -1) {
        const newPermmision :Permission=new Permission();
        newPermmision.permissionId=id;
        newPermmision.action=action;
        this.AllGroupPrivilages.push(newPermmision);
      }
      if (index > -1) {
        this.AllGroupPrivilages.splice(index, 1);
      }
  }
  }



  flag:boolean=false;
  checkAndModifyArray(array:Permission[], ObjectsToAddOrRemove:Permission[]) {
    
    for (let i = 0; i < ObjectsToAddOrRemove.length; i++) {
      const objectToAdd = ObjectsToAddOrRemove[i];
      const isPresent = array.some((obj) => obj.permissionId === objectToAdd.permissionId && obj.action=== objectToAdd.action);
      if (!isPresent) {
        array.push(objectToAdd);
        this.flag=true
      }
    }
    if(this.flag==true){
      this.flag=false;
      return array;
    }
    // Remove objectsToRemove from the array
    let newarray:Permission[] = [];
    for (let i = 0; i < ObjectsToAddOrRemove.length; i++) {
      const objectToRemove = ObjectsToAddOrRemove[i];
      array = array.filter((obj) => obj.permissionId != objectToRemove.permissionId  || obj.action != objectToRemove.action);
    }
    if(this.flag==false){
      return array;
    }
    return array;
  }

  AddGroupForm=new FormGroup({
    name:new FormControl('',[Validators.required])
  });

  get getName(){
    return this.AddGroupForm.controls["name"];
  }

  SubmitGroupFrom(){
    if (this.AddGroupForm.status=="VALID" && this.AllGroupPrivilages.length > 0)
    {
      const newGroup :Group=new Group();
      newGroup.name=String(this.AddGroupForm.value.name);
      newGroup.gropPermissions=this.AllGroupPrivilages;

      console.log(newGroup);

      this.groupService.AddGroup(newGroup).subscribe(res => {
        this.toaster.success("تم إضافة المجموعة بنجاح")
        this.location.back();
      });;


    }
    else if(this.AllGroupPrivilages.length == 0)
    {
      this.toaster.error("لم يتم ادخال اي صلاحيات لهذه المجموعه")
    }
    else if(this.AddGroupForm.value.name=='' ){
      this.toaster.error("ادخل اسم مجموعه ")
    }

  }

}
