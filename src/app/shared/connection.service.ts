import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll(route: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + route);
  }

  post(route: string, body: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + route, body);
  }

  put(route: string, body: any, id: number): Observable<any> {
    console.log(body);
    return this.http.put<any>(this.apiUrl + route + '/' + id, body);
  }

  getByid(route: string, id: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + route + '/' + id);
  }

  delete(route: string, id: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + route + '/' + id);
  }
}