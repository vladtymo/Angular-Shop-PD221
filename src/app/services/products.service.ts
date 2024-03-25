import { Injectable } from '@angular/core';
import { ProductModel, ProductResponseModel } from './products';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const api = "https://dummyjson.com/products";

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<ProductResponseModel> {
    return this.http.get<ProductResponseModel>(api);
  }

  create(model: ProductModel): Observable<any> | null {

    console.log("Creating new product...", model);
    //return this.http.post<ProductModel>(api, model);
    return null;
  }

  // TODO: refactor api path
  delete(id: number): void {
    console.log("Deleting product id: " + id);
    // TODO: handle bad result
    //this.http.delete(api + "/" + id);
  }
}
