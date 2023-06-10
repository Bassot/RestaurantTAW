export interface Queue_Item{
  _id: string,
  name: string,
  type: string,
  price: number,
  //timestamp: Date,    //to order te queue, maybe we don't need it on front-end side
  status: string,
  table: number
}
