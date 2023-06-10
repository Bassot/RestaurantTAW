import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, Subject, tap} from 'rxjs';
import {Table} from './table';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private url = 'http://localhost:8080';

  private headers = new HttpHeaders({
    'cache-control': 'no-cache',
    'Content-Type':  'application/json'
  });
  private tables$: Subject<Table[]> = new Subject();

  constructor(private httpClient: HttpClient) {}

  getOptions(){
    return {
      headers: this.headers
    };
  }

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


  occupyTable(number :any) : Observable<string>{
    return this.httpClient.put(`${this.url}/tables/${number}`,  this.getOptions(), { responseType: 'text' });
  }
}
