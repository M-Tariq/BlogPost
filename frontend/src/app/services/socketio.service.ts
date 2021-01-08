import { Injectable } from '@angular/core';
// import * as io from 'socket.io-client';
import {io} from 'socket.io-client/build/index';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket;
  constructor() {
  this.setupSocketConnection(); 
  }
  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }
  sendMessage(msg, date, username){
    this.socket.emit('my message', msg);
  }
}
