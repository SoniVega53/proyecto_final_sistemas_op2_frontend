import { Paciente } from './../../entity/UserEntityRequest';
import { UserRequest } from './../../entity/UserRequest';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Doctor, UserEntityRequest } from '../../entity/UserEntityRequest';
import { ComponentMainComponent } from '../main/component-main/component-main.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent extends ComponentMainComponent implements OnInit {
  userRequest: UserEntityRequest = {};
  userRequestPassw: UserRequest = {};

  validButton: boolean = false;

  // constructor(
  //   public override authService: AuthApiService,
  //   public override router: Router,
  //   public override serviceUser: UserApiService
  // ) {
  //   super(authService,router,serviceUser);
  // }

  ngOnInit(): void {
    this.getDataUserPerfile();
    this.userRequest = this.getDataUser();
    if (this.userRequest.rol === 'DOCTOR') {
      this.userRequest.name = this.getDataUser().doctor.name;
      this.userRequest.lastname = this.getDataUser().doctor.lastname;
      this.userRequest.specialty = this.getDataUser().doctor.specialty;
      this.userRequest.id_doctor = this.getDataUser().doctor.id;
    } else if (this.userRequest.rol === 'USER') {
      this.userRequest.name = this.getDataUser().paciente.name;
      this.userRequest.lastname = this.getDataUser().paciente.lastname;
      this.userRequest.phone = this.getDataUser().paciente.phone;
      this.userRequest.id_paciente = this.getDataUser().paciente.id;
    }

  }

  actualizarUsuario() {
    this.serviceUser.updateUser(this.userRequest).subscribe((res) => {
      if (res.code == '400') {
        Swal.fire({
          title: 'Error!',
          text: res?.message,
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
        console.error(res);
      } else {
        Swal.fire({
          title: 'Success!',
          text: res?.message,
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        const userEn = this.encripService.encrypt(res?.entity);
        localStorage.setItem('usuario', userEn);
      }
    });
  }

  createUpdatePasswordChange() {
    this.serviceUser
      .updateUserPassword(
        this.userRequestPassw?.password,
        this.userRequestPassw.passwordChange,
        this.username
      )
      .subscribe((res) => {
        if (res.code == '400') {
          Swal.fire({
            title: 'Error!',
            text: res?.message,
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
          console.error(res);
        } else {
          this.login();
        }
      });
  }

  login() {
    const request = new UserRequest();
    request.password = this.userRequestPassw.passwordChange;
    request.username = this.username;
    this.authService.login(request).subscribe((res) => {
      if (res.code == '400') {
        Swal.fire({
          title: 'Error!',
          text: res?.message,
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      } else {
        const userEn = this.encripService.encrypt(res?.entity);
        localStorage.setItem('usuario', userEn);
        Swal.fire({
          title: 'Success!',
          text: 'Se cambio la contraseña correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        this.userRequest = new UserEntityRequest();
        const closeButton = document.querySelector('[data-bs-dismiss="modal"]');
        if (closeButton) {
          (closeButton as HTMLElement).click();
        }
      }
    });
  }

  clearDataModel() {
    this.userRequestPassw = new UserEntityRequest();
  }

  onChangeValuesPassword() {
    this.validButton = this.validActiveButton();
  }

  onChangeValues() {
    this.validButton = this.validActiveButtonEdit();
  }

  validActiveButton(): boolean {
    return (
      this.userRequestPassw.password?.trim() != '' &&
      this.userRequestPassw.password != null &&
      this.userRequestPassw.passwordChange?.trim() != '' &&
      this.userRequestPassw.passwordChange != null
    );
  }

  validActiveButtonEdit(): boolean {
    return (
      this.userRequest.username?.trim() != '' &&
      this.userRequest.username != null &&
      this.userRequest.name?.trim() != '' &&
      this.userRequest.name != null &&
      this.userRequest.lastname?.trim() != '' &&
      this.userRequest.lastname != null &&
      this.userRequest.email?.trim() != '' &&
      this.userRequest.email != null
    );
  }

  logout() {
    this.serviceUser.logout();
  }
  onChange(event: Event) {
    // this.verPermisos();
  }
}
