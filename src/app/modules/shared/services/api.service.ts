import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
  
export class ApiService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  get<T>(url: string) {
    return this.http.get<T>(this.baseUrl + url);
  }

  getPagenation<T>(url: string ,p:any) {
    return this.http.get<T>(this.baseUrl + url,{params:p});
  }

  post<T, R>(url: string, data: R) {
    return this.http.post<T>(this.baseUrl+ url, data);
  }

  put<T, R>(url: string, data: R) {
    return this.http.put<T>(this.baseUrl + url, data);
  }

  delete<T>(url: string) {
      return this.http.delete<T>(this.baseUrl + url);
  }
}
