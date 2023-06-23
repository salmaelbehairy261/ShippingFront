export interface group{

    id: number,
    name: string,
}

export interface groupResponse {
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  data: getAllGroups[];
}
export interface getAllGroups{
  id: number;
  name: string;
  date: Date;
}
export class Group{
    name:string="";
    gropPermissions:Permission[]=[];
}
export class GroupToUpdate{
    id:number=0;
    name:string="";
    groupPermissions:Permission[]=[];
}
export class GroupPrivilageService {
    Privilages: any = [
        {name:"الفرع",value:1},
        {name:"المدن",value:2},
        {name:"المحافظه",value:3},
        {name:"الموظفين",value:4},
        {name:"المندوب",value:5},
        {name:"التاجر",value:6},
        {name:"الطلبات",value:7},
        {name:"تقرير الطلبات",value:8},
        {name:"المجموعات",value:9},
        {name:"الاعدادات",value:10},
        // {name:"اسباب الرفض",value:9},
        // {name:"نوع الشحن",value:10},
        // {name:"الشحن لقريه",value:11},
        // {name:"الوزن",value:12}
    ]
}
export class Permission{
    permissionId:number=0;
    action:string="";
}


export class PermissiontoUseInUpdate{
    id:number=0;
    action:string="";
}