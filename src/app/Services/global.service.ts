import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/util/models/api-response';
import { Injectable } from '@angular/core';
import { io, Socket } from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private socket: Socket;

  constructor(private http: HttpClient) {
    this.socket = io("http://localhost:3000");
  }

  verifyTokenAuthenticity(): Observable<ApiResponse<any>> {
    return this.http.get<any>('auth/verify-token');
  }

  sendMessage(message: string): void {
    this.socket.emit("chat message", message);
  }

  receiveMessage(): Observable<string> {
    return new Observable<string>((observer) => {
      this.socket.on("chat message", (message: string) => {
        observer.next(message);
      });
    });
  }
}
