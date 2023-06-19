export interface addRepresentative {
  name: string;
  userName: string;
  email: string;
  password: string;
  branchId: number;
  phoneNumber: string;
  address: string;
  amount: number;
  type: number;
  representativeGovernates: RepresentativeGovernateDto[];
}

export interface updateRepresentative {
  id: string;
  name: string;
  branchId: number;
  phoneNumber: string;
  address: string;
  amount: number;
  type: number;
  representativeGovernates: RepresentativeGovernateDto[];
}

export interface getRepresentative {
 
  name: string;
  branchId: number;
  phoneNumber: string;
  address: string;
  amount: number;
  type: number;
  representativeGovernates: Governates[];
}

export interface Governates {
  governateId: number;
  governateName: string;
}
export interface RepresentativeGovernateDto {
  governateId: number;
}

export interface getAllRepresentative {
  id: string;
  name: string;
  email: string;
  phone: string;
  branchName: string;
  amount: number;
  type: number;
  isDeleted: boolean;
}

export interface representativeResponse {
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  data: getAllRepresentative[];
}