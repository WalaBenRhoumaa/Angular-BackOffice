import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReactService {

  private apiUrl = 'http://localhost:8089/borrowit/reacts';  // Your backend URL for reacts

  constructor(private http: HttpClient) { }

  deleteReact(reactId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remove-react/${reactId}`);
  }
}