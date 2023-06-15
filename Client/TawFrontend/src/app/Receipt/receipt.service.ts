import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserService} from "../User/user.service";
import {Receipt} from "./receipt";

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {
  private url = 'http://localhost:8080/receipts';
  private headers: HttpHeaders;


  constructor(private userService: UserService, private httpClient: HttpClient) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.userService.getToken(),
      'cache-control': 'no-cache',
      'Content-Type': 'application/json'
    });
  }

  addReceipt(receipt: Receipt){
    return this.httpClient.post(this.url, receipt, { headers: this.headers });
  }
}
