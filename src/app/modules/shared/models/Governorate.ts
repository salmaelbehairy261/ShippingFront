import { city } from "./City"

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