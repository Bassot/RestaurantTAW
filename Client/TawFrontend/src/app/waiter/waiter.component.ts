import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Table } from '../Table/table';
import {TableService} from "../Table/table.service";

@Component({
  selector: 'app-waiter',
  template: `
    <h2 class="text-center m-5">Tables List</h2>

    <table class="table table-striped table-bordered">
      <thead>
      <tr>
        <th>Table number</th>
        <th>Seats</th>
        <th>State</th>
        <th>Actions</th>
      </tr>
      </thead>

      <tbody>
      <tr *ngFor="let table of tables$ | async">
            <td>{{table.number}}</td>
            <td>{{table.seats}}</td>
            <td *ngIf="table.isFree == false">Occupied</td>
            <td *ngIf="table.isFree == false">
              <button class="btn btn-info" [routerLink]="['/menu']">Add order</button> &nbsp;
              <button class="btn btn-primary" [routerLink]="['table/', table.number]">Orders status</button> &nbsp;
              <button class="btn btn-success" (click)="freeTable(table.number)">Free table</button>
            </td>
            <td *ngIf="table.isFree == true">Free</td>
            <td *ngIf="table.isFree == true">
              <button class="btn btn-warning" (click)="occupyTable(table.number)">Occupy table</button> &nbsp;
            </td>
      </tr>
      </tbody>
    </table>
  `
})
export class WaiterComponent implements OnInit {
  tables$: Observable<Table[]> = new Observable();

  constructor(private tablesService: TableService) { }

  ngOnInit(): void {
    this.fetchTables();
  }

  private fetchTables(): void {
    this.tables$ = this.tablesService.getTables();
  }

  freeTable(number :any): void {
    this.tablesService.freeTable(number).subscribe({
      next: () => this.fetchTables()
    });
  }

  occupyTable(number: any): void {
    this.tablesService.occupyTable(number).subscribe({
      next: () => this.fetchTables()
    });
  }
}
