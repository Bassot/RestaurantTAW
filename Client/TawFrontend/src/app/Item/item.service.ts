import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, Subject, tap} from 'rxjs';
import {Item} from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private url = 'http://localhost:8080';

  private headers = new HttpHeaders({
    'cache-control': 'no-cache',
    'Content-Type':  'application/json'
  });
  private items$: Subject<Item[]> = new Subject();


  constructor(private httpClient: HttpClient) {
  }

  getOptions(){
    return {
      headers: this.headers
    };
  }

  private refreshItems() {
    this.httpClient.get<Item[]>(`${this.url}/menu`)
      .subscribe(items => {
        this.items$.next(items);
      });
  }

  getItems(): Subject<Item[]> {
    this.refreshItems();
    return this.items$;
  }
}
