import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, Subject, tap} from 'rxjs';
import {Table} from './table';
import {UserService} from "../User/user.service";

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private url = 'http://localhost:8080';

  private headers: HttpHeaders;
  private tables$: Subject<Table[]> = new Subject();

  constructor(private httpClient: HttpClient, private userService: UserService) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.userService.getToken(),
      'cache-control': 'no-cache',
      'Content-Type': 'application/json'
    });
  }

  private refreshTables() {
    this.httpClient.get<Table[]>(`${this.url}/tables`, {
      headers: this.headers
    }).subscribe(tables => {
      this.tables$.next(tables);
    });
  }

  getTables(): Subject<Table[]> {
    this.refreshTables();
    return this.tables$;
  }


  occupyTable(number: any): Observable<string> {
    return this.httpClient.put(`${this.url}/tables/${number}`, null, {
      headers: this.headers,
      responseType: 'text'
    });
  }
}
