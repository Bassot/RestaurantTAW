import {Order} from "../Order/order";

export interface Table {
  total_seats: number,
  free_seats: number,
  isFree: boolean,
  orders: Order[]
}
