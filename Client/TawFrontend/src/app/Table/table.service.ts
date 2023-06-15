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
  constructor(private httpClient: HttpClient, private userService: UserService) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.userService.getToken(),
      'cache-control': 'no-cache',
      'Content-Type': 'application/json'
    });
  }

  getTables(waiter?: string) {
    if(waiter!=undefined){
      return this.httpClient.get(`${this.url}/tables`, { headers: this.headers, params: new HttpParams().set('email', waiter)});
    }
    return this.httpClient.get(`${this.url}/tables`, { headers: this.headers});
  }
  occupyTable(number: any, email: string){
    let params = new HttpParams();
    params.append('action', 'occupy');
    params.append('waiter', email);
    return this.httpClient.put(`${this.url}/tables/${number}`, null, {
      headers: this.headers,
      responseType: 'text', params: params}
      );
  }
  freeTable(number: any, email: string){
    let params = new HttpParams();
    params.append('action', 'free');
    params.append('waiter', email);
    return this.httpClient.put(`${this.url}/tables/${number}`, null, {
      headers: this.headers,
      responseType: 'text', params: params
    });
  }
}
