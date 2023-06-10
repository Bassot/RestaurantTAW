import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Table} from "../Table/table";
import {TableService} from "../Table/table.service";
import {QueueService} from "../Queue/queue.service";
import {Queue_Item} from "../Queue/queue_item";

@Component({
  selector: 'app-cook',
  templateUrl: './cook.component.html',
  styleUrls: ['./cook.component.css']
})
export class CookComponent implements OnInit{
  // TODO: Observable<queue_items>
  //oppure fare come il prof
  itemsInQueue: Queue_Item[] = [];
  constructor(private queueService: QueueService) {}

  ngOnInit(): void {
    this.refreshQueue();
  }

  //given the table number, it returns all the orders related to that table
  refreshQueue(){
    this.queueService.getAllQueue().subscribe({
      next: (items) => {
        console.log('Items in queue retrieved');
        this.itemsInQueue = items as Queue_Item[];
      },
      error: (err) => {
        console.log('Error retrieving items from queue: ' + err);
      }
    });
  }

  //methods to the waitress related
  setItemAsInPreparation(){
    //this.queueService.updateItemStatus()
  }
  setItemAsReady(){
    //this.queueService.updateItemStatus()
  }

}
