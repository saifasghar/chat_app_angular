import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from 'src/app/util/models/api-response';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) { }

  login(credentials: { email: string, password: string }): Observable<ApiResponse<any>> {
    // return this.http.post<any>('auth/login', credentials).pipe(map(response => response.token));
    return this.http.post<any>('auth/login', credentials);
  }

  signup(body: any): Observable<ApiResponse<any>> {
    return this.http.post<any>('auth/signup', body);
  }

  verifyAccount(token: any): Observable<ApiResponse<any>> {
    return this.http.post<any>('auth/verify-account', { token });
  }

  sendResetPasswordLink(email: string): Observable<ApiResponse<any>> {
    return this.http.post<any>('auth/forgot-password', { email });
  }

  resetPassword(body: { token: string | null, password: string }): Observable<ApiResponse<any>> {
    return this.http.post<any>('auth/reset-password', body);
  }
}
