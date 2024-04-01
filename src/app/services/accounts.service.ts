import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel, LoginResponseModel, RegisterModel } from '../account/account';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  basePath: string;

  constructor(private http: HttpClient) {

    this.basePath = "https://localhost:7206/api/"; //process.env["LOCAL_API"] ?? "";
    this.basePath += "accounts/"
  }

  register(model: RegisterModel): Observable<any> {
    console.log(model);

    return this.http.post(this.basePath + 'register', model);
  }

  login(model: LoginModel): Observable<LoginResponseModel> {
    console.log(model);
    return this.http.post<LoginResponseModel>(this.basePath + 'login', model);
  }
}
