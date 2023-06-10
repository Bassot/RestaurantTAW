import {Injectable} from '@angular/core';
import {UserService} from "../User/user.service";
import {Observable} from "rxjs";
import {io} from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  private socket: any;

  constructor(private userService: UserService) {
  }

  connect(): Observable<any> {
    this.socket = io(this.userService.getUrl());

    return new Observable<any>((observer) => {
      this.socket.on('queue', (m: any) => {
        console.log('Message received to queue');
        observer.next(m);
      });
      this.socket.on('error', (err: any) => {
        console.log('Socket.io error: ' + err);
        observer.error(err);
      });
      return {
        unsubscribe: () => {
          this.socket.disconnect();
        }
      };
    });
  }
}
