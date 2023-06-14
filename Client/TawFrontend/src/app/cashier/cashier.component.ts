import {Component, OnInit} from '@angular/core';
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

  constructor(private queueService: QueueService, private tablesService: TableService, private socketService: SocketioService) {}

  ngOnInit(): void {
    // refreshTables is calling also the refreshQueue method
    this.refreshTables();
    // cashier is connected in both queue and table topic to see the updates
    this.socketService.connectQueue().subscribe((m) => {
      this.refreshQueue();
    });
    this.socketService.connectTables().subscribe((m) => {
      this.refreshTables();
    });
  }

  refreshTables() {
    this.tablesService.getTables().subscribe({
      next: (tables) => {
        console.log('Tables retrieved');
        this.tables = tables as Table[];

        // refreshing also the queue
        this.refreshQueue();
      },
      error: (err) => {
        console.log('Error retrieving tables from DB: ' + JSON.stringify(err));
      }
    });
  }

  private refreshQueue(){
    this.queueService.getAllQueue().subscribe({
      next: (items) => {
        console.log('Items in queue retrieved');
        this.itemsInQueue = items as Queue_Item[];

        // calculating the totals
        this.calculateTotalPrice();
      },
      error: (err) => {
        console.log('Error retrieving items from queue: ' + JSON.stringify(err));
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

  freeTableAndItems(tableNum: number){
    if(confirm("Are you sure to free table "+tableNum+" and its related items?")){
      this.queueService.deleteTableOrder(tableNum).subscribe({
        next: (res) =>{
          console.log('Items related to table '+tableNum+' deleted');

          //free the table
          this.tablesService.freeTable(tableNum).subscribe({
            next: (res) => console.log('Table '+tableNum+' now is free')
          })
        },
        error: (err) => console.log('Error deleting the item related to table '+tableNum)
      })
    }
  }
}
