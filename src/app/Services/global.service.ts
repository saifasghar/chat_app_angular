import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, last } from 'rxjs';
import { ApiResponse } from 'src/app/util/models/api-response';
import { Injectable } from '@angular/core';
import { io, ManagerOptions, Socket, SocketOptions } from "socket.io-client";
import { StorageObserver } from '../util/storage.observer';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private socket: Socket;
  private tokenKey: string = 'jwt_token';
  private token: string | null = '';

  constructor(private http: HttpClient, private storageObserver: StorageObserver) {
    this.token = this.storageObserver.getCookie(this.tokenKey);

    this.socket = io(environment.baseUrl, {
      auth: {
        token: this.token
      }
    });
  }

  verifyTokenAuthenticity(): Observable<ApiResponse<any>> {
    return this.http.get<any>('auth/verify-token');
  }

  sendMessage(message: string): void {
    this.socket.emit("chat message", message);
  }

  disconnectUser() {
    this.socket.emit("logout");
  }

  receiveMessage(): Observable<string> {
    return new Observable<string>((observer) => {
      this.socket.on("chat message", (message: string) => {
        observer.next(message);
      });
    });
  }
}
