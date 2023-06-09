import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../Item/item';
import {ItemService} from "../Item/item.service";

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
              <button class="btn btn-success" (click)="addOrder(item.name)">Add order</button>
            </td>
      </tr>
      </tbody>
    </table>
  `
})
export class ItemsMenuComponent implements OnInit {
  items$: Observable<Item[]> = new Observable();

  constructor(private itemService: ItemService) {
  }

  ngOnInit(): void {
    this.fetchItems();
  }

  private fetchItems(): void {
    this.items$ = this.itemService.getItems();
  }

  addOrder(name: any): void {
  }
}
