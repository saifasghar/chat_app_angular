import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/util/models/api-response';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http: HttpClient) { }

  verifyTokenAuthenticity(): Observable<ApiResponse<any>> {
    return this.http.get<any>('auth/verify-token');
  }
}
