import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/util/models/api-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPotentialFriends(lookupTerm: string): Observable<ApiResponse<any>> {
    return this.http.get<any>(`potential-friends/${lookupTerm}`);
  }
}
