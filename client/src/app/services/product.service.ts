import { Product } from '../models/Product';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productUrl: string = 'http://localhost:4545/api/product';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl);
  }

  getProduct(title: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productUrl}/title/${title}`);
  }

  getProductsByType(type: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productUrl}/type/${type}`);
  }

  getTypes(): Observable<String[]> {
    return this.http.get<String[]>(`${this.productUrl}/type`);
  }
}
