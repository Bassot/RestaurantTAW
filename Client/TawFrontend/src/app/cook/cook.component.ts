import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Table} from "../Table/table";
import {TableService} from "../Table/table.service";

@Component({
  selector: 'app-cook',
  templateUrl: './cook.component.html',
  styleUrls: ['./cook.component.css']
})
export class CookComponent implements OnInit{
  // TODO: Observable<queue_items>
  //oppure fare come il prof
  ordersQueue: Observable<any> = new Observable();

  constructor(private tablesService: TableService) {}

  ngOnInit(): void {
    this.fetchTables();
  }

  private fetchTables(): void {
    this.ordersQueue = this.tablesService.getTables();
  }

  //given the table number, it returns all the orders related to that table
  getAllOrdersInQueue(){
    return null;
  }

  //methods to the waitress related
  setItemAsInPreparation(){

  }
  setItemAsReady(){

  }

}
