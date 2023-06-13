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
export class CashierComponent implements OnInit {
  itemsInQueue: Queue_Item[] = [];
  tables: Table[] = [];

  constructor(private queueService: QueueService, private tablesService: TableService, private socketService: SocketioService) {
  }

  ngOnInit(): void {
    this.refreshData();
    this.socketService.connectQueue().subscribe((m) => {
      this.refreshData();
    })
  }

  async refreshData() {
    this.tablesService.getTables().subscribe({
      next: (tables) => {
        console.log('Tables retrieved');
        this.tables = tables as Table[];

        // retrieving items data
        this.queueService.getAllQueue().subscribe({
          next: (items) => {
            console.log('Items in queue retrieved');
            this.itemsInQueue = items as Queue_Item[];
            this.calculateTotalPrice();
          },
          error: (err) => {
            console.log('Error retrieving items from queue: ' + JSON.stringify(err));
          }
        });
      },
      error: (err) => {
        console.log('Error retrieving tables from DB: ' + JSON.stringify(err));
      }
    });
  }

  private getItemsRelatedToTable(tableNum: number): Queue_Item[] {
    return this.itemsInQueue.filter((item) => {
      return item.table == tableNum;
    })
  }

  calculateTotalPrice() {
    this.tables.forEach((table) => {
      table.bill = 0.0;
      this.getItemsRelatedToTable(table.number).forEach((item) => {
        table.bill += item.price;
      })
    });
  }

  emitReceipt(tableNum: number, tableBill: number) {
    let it = this.getItemsRelatedToTable(tableNum);
    this.queueService.emitReceipt(tableNum, it, tableBill).subscribe({
      next: (data) => {
        let file = new Blob([data], {type: 'application/pdf'})
        let fileURL = URL.createObjectURL(file);
        // if you want to open PDF in new tab
        window.open(fileURL);
      },
      error: (err) => {
        console.log('Error retrieving receipt PDF from server: ' + JSON.stringify(err));
      }
    });
  }
}
