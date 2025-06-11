import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PrescriptionApiServiceService extends BaseApiService {
  getAllPrescriptions(): Observable<any> {
    return this.getService('prescription/see');
  }

  getAllPrescriptionsCita(appointmentId:any): Observable<any> {
    return this.getService(`prescriptions/see/${appointmentId}`);
  }

  createPrescription(body: any): Observable<any> {
    return this.post('prescription', body);
  }

  updatePrescription(id: number, body: any): Observable<any> {
    return this.post(`prescription/update/${id}`, body);
  }

  deletePrescription(id: number): Observable<any> {
    return this.deleteService(`prescription/eliminar/${id}`);
  }

  getPrescriptionsByDoctor(doctorId: number): Observable<[]> {
    return this.getService(`doctor/${doctorId}/prescriptions`);
  }
}
