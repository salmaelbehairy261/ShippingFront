import { specialPrice } from "./SpecialPrice";

export interface addMerchant {
  name: string;
  userName: string;
  email: string;
  password: string;
  branchId: number;
  phoneNumber: string;
  address: string;
  storeName: string;
  governorateId: number;
  cityId: number;
  pickUp: number;
  returnerPercent: number;
  specialPrices: specialPrice[];
}
export interface updateMerchant {
  id: string;
  name: string;
  branchId: number;
  phoneNumber: string;
  address: string;
  storeName: string;
  governorateId: number;
  cityId: number;
  pickUp: number;
  returnerPercent: number;
  specialPrices: specialPrice[];
}




export interface getMerchant {
  name: string;
  branchId: number;
  phoneNumber: string;
  address: string;
  storeName: string;
  governorateId: number;
  cityId: number;
  pickUp: number;
  returnerPercent: number;
  specialPrices: specialPrice[];
}



export interface getAllMerchants {
  id: string;
  name: string;
  email: string;
  phone: string;
  returnerPercent: number;
  storeName: string;
  branchName: string;
  governateName:string
  address: string;
  isDeleted: boolean;
}



export interface merchantResponse {
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  data: getAllMerchants[];
}