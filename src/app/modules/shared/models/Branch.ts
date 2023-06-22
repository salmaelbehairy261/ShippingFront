
export interface branchList{
  id:number
  name:string
}


export interface addBranch{
  name: string;
}

export interface updateBranch{
  id: number;
  name: string;
}
export interface getBranchById {
 
  name: string;
  isDeleted: boolean;
  status: boolean;
  dateTime: Date;
}
export interface getAllBranch {
  id: number;
  name: string;
  isDeleted: boolean;
  status: boolean;
  dateTime: Date;
}
export interface branchResponse {
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  data: getAllBranch[];
}
	
