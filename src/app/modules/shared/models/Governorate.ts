import { city, cityData } from "./City"

export interface governorateWithCities{
  id:number
  name:string
  cities:city[]
}

export interface governates {
  id: number;
  name: string;
  isDeleted:boolean
}
export interface governate {
  id: number;
  name: string;
}
export interface governateName {
  name: string;
}
export interface governorateWithCity {
  id: number;
  name: string;
  cities: cityData[];
}

export interface governorateResponse {
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  data: governates[];
}
