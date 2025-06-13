import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientApiServiceService extends BaseApiService {
  getAllPatients(): Observable<any> {
    return this.getService('admin/patient/see');
  }

  createPatient(body: any): Observable<any> {
    return this.post('admin/patient/create', body);
  }

  updatePatient(id: number, body: any): Observable<any> {
    return this.putServiceBody(`admin/patient/update/${id}`, body);
  }

  deletePatient(id: number): Observable<any> {
    return this.deleteService(`admin/patient/delete/${id}`);
  }

  //HORARIOS
  getAllHorarios(): Observable<any> {
    return this.getService('datesdoctor/see');
  }

  createHorario(body: any): Observable<any> {
    return this.post('datesdoctor', body);
  }

  getAllHorariosDoc(id_doc: any): Observable<any> {
    return this.getService(`datesdoctor/see/doctor/${id_doc}`);
  }
}
