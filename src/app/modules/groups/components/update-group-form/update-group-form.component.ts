import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyToastrService } from 'src/app/modules/shared/services/my-toastr.service';
import { Group, GroupPrivilageService, GroupToUpdate, Permission, PermissiontoUseInUpdate } from 'src/app/modules/shared/models/Group';
import { GroupService } from 'src/app/modules/shared/services/group.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-update-group-form',
  templateUrl: './update-group-form.component.html',
  styleUrls: ['./update-group-form.component.css']
})
export class UpdateGroupFormComponent implements OnInit{

  constructor(private toaster:MyToastrService ,private route: ActivatedRoute,private groupsService:GroupService,private groupService:GroupService , private location:Location){ }
    id:number=0;
    name:string="";
    groupPrivilagesArr:any;
    group:any;
    // isChecked:any;//working
    isChecked: boolean[][] = [
      [false, false, false,false],
      [false, false, false,false],
      [false, false, false,false],
      [false, false, false,false],
      [false, false, false,false],
      [false, false, false,false],
      [false, false, false,false],
      [false, false, false,false],
      [false, false, false,false],
      [false, false, false,false]
    ];

    ngOnInit(): void {

      const groupsPrivilages:GroupPrivilageService=new GroupPrivilageService();
      this.groupPrivilagesArr=groupsPrivilages.Privilages;
      this.route.params.subscribe(Params=>{this.id = Params['id']});
      this.groupsService.getGroupById(this.id).subscribe(res=>{this.group=res;
        //console.log(this.group)
        this.name=this.group.name.toString();
        this.UpdateGroupForm.patchValue({
          name:this.group.name.toString()
        },{emitEvent:false}
        );
        this.UpdateGroupForm.valueChanges.subscribe(value => {
          this.saveBtnFlag=false;
        });
        const isChecked2:boolean[][]=this.createIsCheckedArr(this.group.permissions);
        this.isChecked=isChecked2;
        //console.log(this.isChecked)
        //this.createIsCheckedArr(this.group.permissions);
        const AllGroupPrivilages2:Permission[] = this.group.permissions.map((obj: { id: any; action: any; }) => {
          const { id, action } = obj;
          return { permissionId:id, action:action } ;
        });
        this.AllGroupPrivilages=AllGroupPrivilages2;
      });

    }
    createIsCheckedArr(groupPermission:any){
      const modifiedArray = groupPermission.map((obj: { id: any; action: any; }) => {
        const { id, action } = obj;
        return { id, action };
      });
      //console.log(Array.isArray(modifiedArray))
      const isChecked2:boolean[][]=[];
      const arrForLastFourPermissions:boolean[]=[false,false,false,false]
      for(let i=1 ; i<=13 ;i++)
      {
        if(i<10)
        {

          const targetObj1: PermissiontoUseInUpdate = { id: i, action: this.AddAction };
          const targetObj2: PermissiontoUseInUpdate = { id: i, action: this.DeleteAction };
          const targetObj3: PermissiontoUseInUpdate = { id: i, action: this.EditAction };
          const targetObj4: PermissiontoUseInUpdate = { id: i, action: this.ShowAction };

          let isPresent1 = modifiedArray.some((obj: { id: number; action: string; }) => obj.id === targetObj1.id && obj.action === targetObj1.action);
          let isPresent2 = modifiedArray.some((obj: { id: number; action: string; }) => obj.id === targetObj2.id && obj.action === targetObj2.action);
          let isPresent3 = modifiedArray.some((obj: { id: number; action: string; }) => obj.id === targetObj3.id && obj.action === targetObj3.action);
          let isPresent4 = modifiedArray.some((obj: { id: number; action: string; }) => obj.id === targetObj4.id && obj.action === targetObj4.action);

          //console.log(isPresent1,isPresent2,isPresent3,isPresent4)
          isChecked2.push([isPresent1,isPresent2,isPresent3,isPresent4])
        }
        else{
          const targetObj1: PermissiontoUseInUpdate = { id: i, action: this.AddAction };
          const targetObj2: PermissiontoUseInUpdate = { id: i, action: this.DeleteAction };
          const targetObj3: PermissiontoUseInUpdate = { id: i, action: this.EditAction };
          const targetObj4: PermissiontoUseInUpdate = { id: i, action: this.ShowAction };

          let isPresent1 = modifiedArray.some((obj: { id: number; action: string; }) => obj.id === targetObj1.id && obj.action === targetObj1.action);
          let isPresent2 = modifiedArray.some((obj: { id: number; action: string; }) => obj.id === targetObj2.id && obj.action === targetObj2.action);
          let isPresent3 = modifiedArray.some((obj: { id: number; action: string; }) => obj.id === targetObj3.id && obj.action === targetObj3.action);
          let isPresent4 = modifiedArray.some((obj: { id: number; action: string; }) => obj.id === targetObj4.id && obj.action === targetObj4.action);
          if(isPresent1)
          {
            arrForLastFourPermissions[0]=true;
          }
          if(isPresent2)
          {
            arrForLastFourPermissions[1]=true;
          }if(isPresent3)
          {
            arrForLastFourPermissions[2]=true;
          }if(isPresent4)
          {
            arrForLastFourPermissions[3]=true;
          }
          if(i==13)
          {
            isChecked2.push(arrForLastFourPermissions)
          }
        }

      }


      //console.log(isChecked2)
      return isChecked2;
    };

   // isChecked:boolean[]=[]
    AddAction:string="Add";
    ShowAction:string="Show";
    EditAction:string="Edit";
    DeleteAction:string="Delete";
    zero:number=0;
    one:number=1;
    two:number=2;
    three:number=3;

    ////////handling permissions Array
    AllGroupPrivilages: Permission[] = [];
    saveBtnFlag:boolean=true;
    AddOrRemovePermission(id:number,action:string){
      if(id==10)
      {
        this.saveBtnFlag=false;
        let ObjectsToAddOrRemove: Permission[] = [];
        for (let index = 0; index < 4; index++) {
          const newPermmision :any={permissionId:id+index,action:action};
          ObjectsToAddOrRemove.push(newPermmision);
        }
        const AllGroupPrivilagesBefore=this.AllGroupPrivilages;
        this.AllGroupPrivilages=this.checkAndModifyArray(this.AllGroupPrivilages,ObjectsToAddOrRemove);
      }
      else
      {
        this.saveBtnFlag=false;
        const index = this.AllGroupPrivilages.findIndex(g =>g.permissionId===id && g.action === action );
        if (index === -1) {
          const newPermmision :any={permissionId:id,action:action}
          this.AllGroupPrivilages.push(newPermmision);
        }
        if (index > -1) {
          this.AllGroupPrivilages.splice(index, 1);
        }
    }
    }



    flag:boolean=false;
    checkAndModifyArray(array:Permission[], ObjectsToAddOrRemove:Permission[]) {
      // Check if objectsToAdd are not already present in the array
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

    UpdateGroupForm=new FormGroup({
      name:new FormControl('',[Validators.required])
    });

    get getName(){
      return this.UpdateGroupForm.controls["name"];
    }

    SubmitGroupFrom(){
      if (this.UpdateGroupForm.status=="VALID" && this.AllGroupPrivilages.length > 0)
      {
        const GroupToBeUpdated :GroupToUpdate=new GroupToUpdate();
        GroupToBeUpdated.id= Number(this.id) ;
        if (this.UpdateGroupForm.controls["name"].value === String(this.UpdateGroupForm.value.name) )
          {
            this.flag=true;
            GroupToBeUpdated.name=String(this.UpdateGroupForm.value.name);
          }
          else{
            GroupToBeUpdated.name=this.name;
          }
        GroupToBeUpdated.groupPermissions=this.AllGroupPrivilages;

        console.log(GroupToBeUpdated);
          ///API Call

        this.groupService.UpdateGroup(GroupToBeUpdated).subscribe(res => {
            this.toaster.success("تم تعديل المجموعة بنجاح")
            this.location.back();
          });;
          ///
      }
      else if(this.AllGroupPrivilages.length == 0)
      {
        this.toaster.error("لم يتم ادخال اي صلاحيات لهذه المجموعه")
      }
      else if(this.UpdateGroupForm.value.name=='' ){
        this.toaster.error("ادخل اسم مجموعه ")
      }

    }

}
