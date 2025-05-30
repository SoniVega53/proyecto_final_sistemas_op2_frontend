import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentApiServiceService extends BaseApiService {
  getAllAppointments(): Observable<any> {
    return this.getService('admin/appointment/see');
  }

  createAppointment(body: any): Observable<any> {
    return this.post('admin/appointment/create', body);
  }

  updateAppointment(id: number, body: any): Observable<any> {
    return this.putServiceBody(`admin/appointment/update/${id}`, body);
  }

  deleteAppointment(id: number): Observable<any> {
    return this.deleteService(`admin/appointment/delete/${id}`);
  }
}
