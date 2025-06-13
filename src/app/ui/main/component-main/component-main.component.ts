import { AppointmentApiServiceService } from './../../../service/appointment-api-service.service';
import { Component, ElementRef } from '@angular/core';
import { AuthApiService } from '../../../service/auth-api.service';
import { UserApiService } from '../../../service/user-api.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CodemirrorComponent } from '@ctrl/ngx-codemirror';
import { EncryptionService } from '../../../entity/EncryptionService';
import { PrescriptionApiServiceService } from '../../../service/prescription-api-service.service';
import { DoctorApiServiceService } from '../../../service/doctor-api-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-component-main',
  templateUrl: './component-main.component.html',
  styleUrl: './component-main.component.css',
})
export class ComponentMainComponent {
  username: String = '';
  user_id: String = '';
  paciente_id: String = '';
  doctor_id: String = '';
  rol_user: String = '';
  userData: String = '';
  rootAccess: boolean = false;
  editorInstance: any;

  constructor(
    public authService: AuthApiService,
    public router: Router,
    public route: ActivatedRoute,
    public serviceUser: UserApiService,
    public encripService: EncryptionService,
    public appoService: AppointmentApiServiceService,
    public prescService: PrescriptionApiServiceService,
    public docService: DoctorApiServiceService
  ) {
    this.getDataUserPerfile();
    this.rootAccess = this.serviceUser.getRootAccess();
  }
  getDataUserPerfile() {
    const data = this.serviceUser.getData();
    if (data) {
      this.username = data?.username ?? '';
      this.user_id = data?.id ?? '';
      this.paciente_id = data?.paciente?.id ?? '';
      this.doctor_id = data?.doctor?.id ?? '';
      this.rol_user = data?.rol ?? '';
    }
  }

  getDataUser() {
    const data = this.serviceUser.getData();
    return data;
  }

  isValidUserAdmin(): boolean {
    let rol: String = this.getDataUser().rol?.toString();
    return rol.toUpperCase() === 'ADMIN';
  }

  isValidUserDoc(): boolean {
    let rol: String = this.getDataUser().rol?.toString();
    return rol.toUpperCase() === 'DOCTOR';
  }

  isValidUserPaci(): boolean {
    let rol: String = this.getDataUser().rol?.toString();
    return rol.toUpperCase() === 'USER';
  }

  onClickIdComponent(id:any) {
    const modalElement = document.getElementById(id);
    if (modalElement) {
      modalElement.click();
    }
  }


  messageEliminar(callback: () => void) {
      Swal.fire({
        title: 'Estas Seguro?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'si, eliminar',
      }).then((result) => {
        if (result.isConfirmed) {
          callback();
        }
      });
    }
}
