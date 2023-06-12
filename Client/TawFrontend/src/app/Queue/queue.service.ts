import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Queue_Item} from "./queue_item";
import {tap} from "rxjs";
import {UserService} from "../User/user.service";

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  private url = 'http://localhost:8080/queue';
  constructor(private httpClient: HttpClient, private userService: UserService) { }

  getOptions(){
    return {
      headers: new HttpHeaders({
        //'Authorization': 'Bearer ' + this.userService.getToken(),
        'cache-control': 'no-cache',
        'Content-Type':  'application/json'
      })
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
    return this.httpClient.get(this.url+'/dish', this.getOptions());
  }
  getAllDrinks(){
    return this.httpClient.get(this.url+'/drink', this.getOptions());
  }

  getTableItems(tableId: number){
    return this.httpClient.get(this.url + '/table/' + tableId, this.getOptions());
  }

  updateItemStatus(itemId: string, newStatus: string){
    let params = {
      id: itemId,
      status: newStatus
    }
    return this.httpClient.post(this.url + '/update', params);
  }
}
