import {Component, OnInit} from '@angular/core';
import {Queue_Item} from "../Queue/queue_item";
import {Observable} from "rxjs";
import {Table} from "../Table/table";
import {QueueService} from "../Queue/queue.service";
import {TableService} from "../Table/table.service";
import {SocketioService} from "../Socketio/socketio.service";

@Component({
  selector: 'app-bartender',
  templateUrl: './bartender.component.html',
  styleUrls: ['./bartender.component.css']
})
export class BartenderComponent implements OnInit{
  itemsInQueue: Queue_Item[] = [];
  tables: Table[] = [];

  constructor(private queueService: QueueService, private tablesService: TableService, private socketService: SocketioService) {
  }

  ngOnInit(): void {
    this.refreshQueue();
    this.socketService.connectQueue().subscribe((m) => {
      this.refreshQueue();
    })
  }

  refreshQueue() {
    this.queueService.getAllDrinks().subscribe({
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

  getItemsRelatedToTable(tableNum: number): Queue_Item[] {
    return this.itemsInQueue.filter(function (item) {
      return item.table == tableNum;
    });
  }

  //methods to the waitress related
  updateItemStatus(itemId: string, newStatus: string) {
    console.log('Request for updating, item: ' + itemId + ', new status: ' + newStatus);
    this.queueService.updateItemStatus(itemId, newStatus).subscribe({
      next: (itemUpdated) => {
        console.log('Item status updated, received: ' + JSON.stringify(itemUpdated));
      },
      error: (err) => {
        console.log('Error updating status : ' + JSON.stringify(err));
      }
    });
  }
}

