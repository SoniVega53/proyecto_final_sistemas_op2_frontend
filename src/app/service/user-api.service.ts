import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthApiService } from './auth-api.service';
import { UserEntityRequest } from '../entity/UserEntityRequest';

@Injectable({
  providedIn: 'root'
})
export class UserApiService extends AuthApiService{


  getAllUsers(): Observable<any>{
    return this.getService("admin/usuario/see_all");
  }
  getInfoUser(): Observable<any>{
    const user = this.getUserName()
    return this.postServiceBody(`user/usuario?usuario=${user}`,null);
  }

  deleteUsuario(name:any): Observable<any>{
    const param = { nombre:name}

    return this.postServiceBody(`eliminarUsurio`,param);
  }

  updateUserPassword(validPass:any, newpas:any,username:any):Observable<any>{
    const body = { password:validPass, passwordChange:newpas,username}
    return this.postServiceBody(`usuario/cambiarPassword`,null,body);
  }

  updateUser(body:UserEntityRequest):Observable<any>{
    return this.postServiceBody(`usuario/update`,null,body);
  }


}
