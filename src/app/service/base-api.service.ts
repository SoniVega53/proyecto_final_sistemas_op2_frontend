import { EncryptionService } from './../entity/EncryptionService';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
  public userKey = 'usuario';

  //public urlService: string = 'http://localhost:9090/api/proyecto/';
  public urlService: string = 'http://34.44.243.186:9090/api/proyecto/';

  constructor(
    public http: HttpClient,
    public router: Router,
    public encripService: EncryptionService
  ) {}

  protected getService(url: string): Observable<any> {
    return this.http
      .get(this.urlService.concat(url))
      .pipe(catchError(async (e) => console.log(e)));
  }

  protected deleteService(url: string): Observable<any> {
    return this.http
      .delete(this.urlService.concat(url))
      .pipe(catchError(async (e) => console.log(e)));
  }

  protected putServiceBody(url: string, body: any): Observable<any> {
    return this.http
      .put(this.urlService.concat(url), body)
      .pipe(catchError(async (e) => console.log(e)));
  }

  post(url: string, body: any): Observable<any> {
    return this.http
      .post(this.urlService.concat(url), body)
      .pipe(catchError(async (e) => console.log(e)));
  }

  protected postServiceBody(
    url: string,
    params?: any,
    body?: any
  ): Observable<any> {

    if (!params) params = {};
    if (!body) body = {};

    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        httpParams = httpParams.set(key, params[key]);
      });
    }

    return this.http
      .post(this.urlService.concat(url), body, {
        params: httpParams,
      })
      .pipe(
        catchError((error) => {
          console.log(error);
          throw error;
        })
      );
  }

  getData(): any {
    if (typeof window !== 'undefined') {
      const storedEncrypted = localStorage.getItem(this.userKey);
      if (storedEncrypted) {
        const decrypted = this.encripService.decrypt(storedEncrypted);
        return decrypted;
      }
      return '';
    } else {
      return null;
    }
  }

  getRootAccess(): boolean {
    const data = this.getData();
    if (!data) return false;
    return data.user == 'root';
  }


}
