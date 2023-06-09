import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, Subject, tap} from 'rxjs';
import {Table} from './table';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private url = 'http://localhost:8080';
  private tables$: Subject<Table[]> = new Subject();

  constructor(private httpClient: HttpClient) {}



  private refreshTables() {
    this.httpClient.get<Table[]>(`${this.url}/tables`)
      .subscribe(tables => {
        this.tables$.next(tables);
      });
  }

  getTables(): Subject<Table[]> {
    this.refreshTables();
    return this.tables$;
  }

  freeTable(number: any) {
    return this.httpClient.post(`${this.url}/tables`, number, {headers: new HttpHeaders({
        'cache-control': 'no-cache',
        'Content-Type': 'application/json'
      }),params: new HttpParams().set('action', "free")});
  }

  occupyTable(number :any) {
    return this.httpClient.post(`${this.url}/tables`, number, {headers: new HttpHeaders({
      'cache-control': 'no-cache',
      'Content-Type': 'application/json'
    }),params: new HttpParams().set('action', "occupy")});
  }
}
