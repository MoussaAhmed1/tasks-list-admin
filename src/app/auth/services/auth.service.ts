import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDate, LoginResponse } from '../../../interfaces/login';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpclient:HttpClient) { }

  login(model:LoginDate):Observable<LoginResponse>{
    return this.httpclient.post(`${environment.baseApi}/auth/login`,model) as Observable<LoginResponse>;
  }
}
