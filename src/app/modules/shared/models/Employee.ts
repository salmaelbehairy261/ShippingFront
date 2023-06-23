export interface addEmployee{

  name: string ;
  userName: string ;
  email: string ;
  password: string ;
  branchId: number ;
  phoneNumber: string ;
  address: string;
  groupId: number ;
    
}


export interface updateEmployee{
  id: string;
  name: string ;
  phoneNumber: string;
  address: string;
  branchId: number ;
  groupId: number ;
}

export interface getAllEmployees{
  id: string;
  name: string;
  email: string;
  phone: string;
  branchName: number ;
  groupName: number ;
  isDeleted: boolean;
}

export interface getEmployee{
  name: string ;
  phoneNumber: string;
  address: string;
  branchId: number ;
  groupId: number ;

}

export interface employeeResponse {
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  data: getAllEmployees[];
}

export interface updatePassword{
  id: string;
  email: string;
  password: string;
}
