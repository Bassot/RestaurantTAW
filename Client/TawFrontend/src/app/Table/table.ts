import {Order} from "../Order/order";

export interface Table {

  number: number
  total_seats: number,
  free_seats: number,
  isFree: boolean,
  orders: Order[]
}
