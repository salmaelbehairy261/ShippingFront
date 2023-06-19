export interface city{
  id:number
  name:string
}
export interface cityData {
  id: number;
  name:string;
  price:number;
  pickup:number;
  isDeleted:boolean;
}

export interface AddCity
{
  name: string,
  price: number,
  pickup: number,
  governorateId: number
}

export interface UpdateCity
{
  id:number,
  name: string,
  price: number,
  pickup: number,
  governorateId: number
}
