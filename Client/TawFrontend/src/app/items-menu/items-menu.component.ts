import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../Item/item';
import {ItemService} from "../Item/item.service";
import {Queue_Item} from "../Queue/queue_item";
import {ActivatedRoute, Router} from "@angular/router";
import {QueueService} from "../Queue/queue.service";
import {ObjectId} from "bson";
@Component({
  selector: 'app-items-menu',
  template: `
    <h2 class="text-center m-5">Menù</h2>

    <table class="table table-striped table-bordered">
      <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
      </thead>

      <tbody>
      <tr *ngFor="let item of items$ | async">
            <td>{{item.name}}</td>
            <td>{{item.type}}</td>
            <td>{{item.price}}</td>
            <td>
              <button class="btn btn-success" (click)="addToOrder(item.name, item.type, item.price)">Add to order</button>
            </td>
      </tr>
      <br>
      <div class="container">
        <div class="row">
             <div class="row text-center">
               <button class="btn btn-primary" (click)="completeOrder()">Complete Order</button>
             </div>
        </div>
      </div>


      </tbody>
    </table>
  `
})
export class ItemsMenuComponent implements OnInit {
  items$: Observable<Item[]> = new Observable();

  queue_items: any = [];
  table_number :any;
  constructor(private itemService: ItemService,
              private route: ActivatedRoute,
              private queueService: QueueService,
              private router: Router) {}

  ngOnInit(): void {
    this.fetchItems();
    this.route.paramMap.subscribe(params => {
      this.table_number = params.get('number');
    })
  }

  private fetchItems(): void {
    this.items$ = this.itemService.getItems();
  }

  addToOrder(name: string, type: string, price:number): void {
    const item = {
      name: name,
      type: type,
      price: price,
      timestamp: undefined, // will be populated on server side
      status: 'Pending',
      table: this.table_number,
    };
    this.queue_items.push(item);
    console.log('Item added: ' + JSON.stringify(item));
  }

  completeOrder(): void{
    this.queueService.insertOrder(this.queue_items).subscribe({
      next: (res) => {
        console.log('Order inserted: ' + JSON.stringify(res));
        this.queue_items = [];
        this.router.navigate(['/waiters']);
      },
      error: (err) => {
        console.log('Error inserting order: ' + JSON.stringify(err));
      }
    });
  }
}
