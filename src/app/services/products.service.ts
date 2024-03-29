import { Injectable } from '@angular/core';
import { CreateProductModel, ProductModel, ProductResponseModel } from './products';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  //private readonly api = process.env;
  basePath: string;

  constructor(private http: HttpClient) {

    this.basePath = "https://localhost:7206/api/"; //process.env["LOCAL_API"] ?? "";
    this.basePath += "products/"
  }

  getAll(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.basePath);
  }

  get(id: number): Observable<ProductModel> {
    return this.http.get<ProductModel>(this.basePath + id);
  }

  create(model: CreateProductModel): Observable<any> {
    console.log("Creating new product...", model);

    const formData = new FormData();
    // Object.entries(model).forEach(([key, value]) => {
    //   formData.append(key, value);
    // });

    for (const key in model) {
      const value = model[key as keyof CreateProductModel] as string | Blob;
      formData.append(key, value);
    }

    const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });
    return this.http.post(this.basePath, formData, { headers: headers });

    //return this.http.post<ProductModel>(this.basePath, model);
  }

  edit(model: ProductModel): Observable<any> {
    console.log(`Editing product:`, model);
    return this.http.put<ProductModel>(this.basePath, model);
  }

  // TODO: refactor api path
  delete(id: number): Observable<any> {
    console.log("Deleting product id: " + id);
    // TODO: handle bad result
    return this.http.delete(this.basePath + id);
  }
}
