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

  authenticate(username: string, password: string): Observable<ApiResponse<any>> {
    const credentials = { username, password };
    return this.http.post<any>('auth/login', credentials).pipe(map(response => response.token));
  }

  signup(body: any): Observable<ApiResponse<any>> {
    return this.http.post<any>('auth/signup', body);
  }
}
