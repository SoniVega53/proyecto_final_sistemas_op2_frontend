import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PrescriptionApiServiceService extends BaseApiService {
  getAllPrescriptions(): Observable<any> {
    return this.getService('admin/prescription/see');
  }

  createPrescription(body: any): Observable<any> {
    return this.post('admin/prescription/create', body);
  }

  updatePrescription(id: number, body: any): Observable<any> {
    return this.putServiceBody(`admin/prescription/update/${id}`, body);
  }

  deletePrescription(id: number): Observable<any> {
    return this.deleteService(`admin/prescription/delete/${id}`);
  }
}
