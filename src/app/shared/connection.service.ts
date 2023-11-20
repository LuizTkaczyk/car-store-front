import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll(route: string, page: number = 0, itemPerPage:number = 10): Observable<any> {
    const params = new HttpParams().set('page', page.toString()).set('itemPerPage', itemPerPage.toString());
    return this.http.get<any>(this.apiUrl + route, { params: params });
  }

  post(route: string, body: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + route, body);
  }

  put(route: string, body: any, id: number): Observable<any> {
    return this.http.put<any>(this.apiUrl + route + '/' + id, body);
  }

  getById(route: string, id: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + route + '/' + id);
  }

  delete(route: string, id: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + route + '/' + id);
  }
}
