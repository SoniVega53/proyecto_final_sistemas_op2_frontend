import { Injectable } from '@angular/core';
import { AuthApiService } from './auth-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DoctorApiServiceService extends AuthApiService {
  getAllDoctors(): Observable<any> {
    return this.getService('admin/doctor/see');
  }

  createDoctor(body: any): Observable<any> {
    return this.post('admin/doctor/create', body);
  }

  updateDoctor(id: number, body: any): Observable<any> {
    return this.putServiceBody(`admin/doctor/update/${id}`, body);
  }

  deleteDoctor(id: number): Observable<any> {
    return this.deleteService(`admin/doctor/delete/${id}`);
  }
}
