import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) { }

  authenticate(username: string, password: string): Observable<string> {
    const credentials = { username, password };
    return this.http.post<any>('auth/login', credentials).pipe(map(response => response.token));
  }

  test(): Observable<string> {
    return this.http.get<any>('home');
  }

}
