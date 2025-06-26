import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiService: string = "https://685cee60769de2bf085e7bbe.mockapi.io/api/v1/creditur"

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(this.apiService);
  }

  addData(data: any) {
    return this.http.post(this.apiService, data);
  }

  deleteData(id: string) {
    return this.http.delete(`${this.apiService}/${id}`);
  }

}
