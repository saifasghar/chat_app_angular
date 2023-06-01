import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/util/models/api-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  fetchAllFriends(): Observable<ApiResponse<any>> {
    return this.http.get<any>('friends/all');
  }

  sendFriendRequest(body: { email: string, message: string }): Observable<ApiResponse<any>> {
    return this.http.post<any>('friend/request/new', body);
  }

  confirmFriendRequest(body: { email: string, notificationId: string }): Observable<ApiResponse<any>> {
    return this.http.post<any>('friend/request/confirm', body);
  }

  rejectFriendRequest(body: { email: string }): Observable<ApiResponse<any>> {
    return this.http.post<any>('friend/request/reject', body);
  }

  fetchAllNotifications(): Observable<ApiResponse<any>> {
    return this.http.get<any>('notifications/all');
  }

  clearNotifications(id: string): Observable<ApiResponse<any>> {
    return this.http.post<any>(`notifications/clear/${id}`, {});
  }
}
