import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Table } from '../Table/table';
import {TableService} from "../Table/table.service";

@Component({
  selector: 'app-tables-list',
  template: `
    <h2 class="text-center m-5">Tables List</h2>

    <table class="table table-striped table-bordered">
      <thead>
      <tr>
        <th>Number</th>
        <th>Seats</th>
        <th>isFree</th>
      </tr>
      </thead>

      <tbody>
      <tr *ngFor="let table of tables$ | async">
        <td>{{table.number}}</td>
        <td>{{table.seats}}</td>
        <td>{{table.isFree}}</td>
      </tr>
      </tbody>
    </table>
  `
})
export class TablesListComponent implements OnInit {
  tables$: Observable<Table[]> = new Observable();

  constructor(private tablesService: TableService) { }

  ngOnInit(): void {
    this.fetchTables();
  }

  private fetchTables(): void {
    this.tables$ = this.tablesService.getTables();
  }
}
