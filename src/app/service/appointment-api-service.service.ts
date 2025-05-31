import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentApiServiceService extends BaseApiService {
  getAllAppointments(): Observable<any> {
    return this.getService('appointment/see');
  }

  getAllAppointmentsDoc(id_doc: any): Observable<any> {
    return this.getService(`appointments/see/doctor/${id_doc}`);
  }

  getAllAppointmentsPac(id_pac: any): Observable<any> {
    return this.getService(`appointments/see/paciente/${id_pac}`);
  }

  createAppointment(body: any): Observable<any> {
    return this.postServiceBody('appointment',null, body);
  }

  updateAppointment(id: number, body: any): Observable<any> {
    return this.putServiceBody(`appointment/update/${id}`, body);
  }

  deleteAppointment(id: number): Observable<any> {
    return this.deleteService(`appointment/eliminar/${id}`);
  }
}
