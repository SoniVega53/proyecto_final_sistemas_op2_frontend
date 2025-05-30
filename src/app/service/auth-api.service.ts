import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { UserRequest } from '../entity/UserRequest';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { UserEntity } from '../entity/UserEntity';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService extends BaseApiService {

  login(body: UserRequest): Observable<any> {
    return this.post(`auth/login`, body);
  }

  register(body: UserEntity): Observable<any> {
    console.log(body)
    return this.post(`auth/register`, body);
  }

  logout() {
    localStorage.removeItem(this.userKey);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    if (this.isLocalStorageAvailable()){
      return !!localStorage.getItem(this.userKey)
    };
    return false;
  }


  getUserName():String {
    const data = this.getData();
    return data?.user;
  }


  public isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
