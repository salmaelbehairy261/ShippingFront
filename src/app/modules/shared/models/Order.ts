export enum orderType
{
  ReceiveFromTheBranch=0,
  ReceiveFromTheTrader=1
}
export enum PaymentType
{
  payOnDelivery=0,
  prepaid=1,
  packageForAPackage=2
}
export interface Order
{
  MerchantId:string,
  orderType:number,
  paymentType:number,
  clientName:string,
  firstPhoneNumber:string,
  secondPhoneNumber:string|null,
  email:string,
  governorateId:number,
  cityId:number,
  street:string,
  deliverToVillage:boolean,
  shippingTypeId:number,
  branchId:number,
  notes:string|null,
  products:Product[]
}
export interface OrderToUpdate
{
  id:number,
  MerchantId:string,
  orderType:number,
  paymentType:number,
  clientName:string,
  firstPhoneNumber:string,
  secondPhoneNumber:string|null,
  email:string,
  governorateId:number,
  cityId:number,
  street:string,
  deliverToVillage:boolean,
  shippingTypeId:number,
  branchId:number,
  notes:string|null,
  products:Product[]
}
export interface Product
{
  name: string,
  quantity: number,
  price: number,
  weight: number
}
