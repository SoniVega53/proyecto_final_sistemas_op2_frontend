import { Component, OnInit } from '@angular/core';
import { ComponentMainComponent } from '../../main/component-main/component-main.component';
import Swal from 'sweetalert2';
import { UserEntityRequest } from '../../../entity/UserEntityRequest';

@Component({
  selector: 'app-user-update-page',
  templateUrl: './user-update-page.component.html',
  styleUrl: './user-update-page.component.css',
})
export class UserUpdatePageComponent
  extends ComponentMainComponent
  implements OnInit
{
  requestUser: UserEntityRequest = {};
  paramsData: any = {};

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.paramsData = JSON.parse(params['data']);
    });

    this.obtenerDataUser();
  }


  async obtenerDataUser() {
    this.requestUser = {};

    this.serviceUser.getUserId(this.paramsData?.id).subscribe((res) => {
      if (res.code == '400') {
        Swal.fire({
          title: 'Error!',
          text: res?.message,
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      } else {
        this.pintarData(res?.entity);
      }
    });
  }

  pintarData(value:any){
    this.requestUser.id = value.id;
      this.requestUser.email = value.email;
      this.requestUser.rol = value.rol;
      this.requestUser.username = value.username;

      if (this.requestUser.rol === 'DOCTOR') {
        this.requestUser.name = value.doctor.name;
        this.requestUser.lastname = value.doctor.lastname;
        this.requestUser.specialty = value.doctor.specialty;
        this.requestUser.id_doctor = value.doctor.id;
      } else if (this.requestUser.rol === 'USER') {
        this.requestUser.name = value.paciente.name;
        this.requestUser.lastname = value.paciente.lastname;
        this.requestUser.phone = value.paciente.phone;
        this.requestUser.id_paciente = value.paciente.id;
      }
  }

}
