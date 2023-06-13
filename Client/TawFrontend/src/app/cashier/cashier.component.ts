import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Table} from "../Table/table";
import {QueueService} from "../Queue/queue.service";
import {TableService} from "../Table/table.service";
import {SocketioService} from "../Socketio/socketio.service";
import {Queue_Item} from "../Queue/queue_item";

@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.component.html',
  styleUrls: ['./cashier.component.css']
})
export class CashierComponent implements OnInit{
  itemsInQueue: Queue_Item[] = [];
  tables: Table[] = [];
  constructor(private queueService: QueueService, private tablesService: TableService, private socketService: SocketioService) {}

  ngOnInit(): void {
    this.refreshQueue();
    this.socketService.connectQueue().subscribe((m) => {
      this.refreshQueue();
    })
  }
  refreshQueue() {
    this.queueService.getAllDishes().subscribe({
      next: (items) => {
        console.log('Items in queue retrieved');
        this.itemsInQueue = items as Queue_Item[];
      },
      error: (err) => {
        console.log('Error retrieving items from queue: ' + JSON.stringify(err));
      }
    });
    this.tablesService.getTables().subscribe({
      next: (tables) => {
        console.log('Tables retrieved');
        this.tables = tables as Table[];
      },
      error: (err) => {
        console.log('Error retrieving tables from DB: ' + JSON.stringify(err));
      }
    });
  }

  getItemsRelatedToTable(){
    this.tables.forEach(function (table){

    });
    this.itemsInQueue.forEach(function (item){

    })
  }
}
