import { Injectable } from '@angular/core';
import { AuthApiService } from './auth-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DoctorApiServiceService extends AuthApiService {
  getAllDoctors(): Observable<any> {
    return this.getService('doctors/see');
  }

  createDoctor(body: any): Observable<any> {
    return this.post('doctor/create', body);
  }

  updateDoctor(id: number, body: any): Observable<any> {
    return this.putServiceBody(`doctor/update/${id}`, body);
  }

  deleteDoctor(id: number): Observable<any> {
    return this.deleteService(`doctor/delete/${id}`);
  }

  // ESPECIALIDAD
  getAllspeciality(): Observable<any> {
    return this.getService('specialties/see');
  }

  createEspecialidad(body: any): Observable<any> {
    return this.post('specialties', body);
  }

  updateEspecialidad(body: any, id: any, isUpdate:boolean): Observable<any> {
    if (id) {
      return this.post(`specialties/update/${id}`, body);
    } else {
      return this.post('specialties', body);
    }
  }

  eliminarEspecialidad(id: any): Observable<any> {
    return this.deleteService(`specialties/eliminar/${id}`);
  }
}
