import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Queue_Item} from "./queue_item";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  private url = 'http://localhost:8080/queue';
  private headers = new HttpHeaders({
    'cache-control': 'no-cache',
    'Content-Type':  'application/json'
  });
  constructor(private httpClient: HttpClient) { }

  getOptions(){
    return {
      headers: this.headers
    };
  }

  // insert an array of queue_items
  insertOrder(items: Queue_Item[]){
    return this.httpClient.post(this.url, items, this.getOptions());
  }

  deleteTableOrder(tableId: number){
    return this.httpClient.delete(this.url + '/table/' + tableId, this.getOptions());
  }

  getAllQueue(){
    return this.httpClient.get(this.url, this.getOptions());
  }
  getAllDishes(){
    return this.httpClient.get(this.url, this.getOptions());
  }
  getAllDrinks(){

  }

  getTableItems(tableId: number){
    return this.httpClient.get(this.url + '/table/' + tableId, this.getOptions());
  }

  updateItemStatus(itemId: string, newStatus: string){
    return this.httpClient.patch(this.url + '/'+itemId + '/'+newStatus, this.getOptions());
  }
}
