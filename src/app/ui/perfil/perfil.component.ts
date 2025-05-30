import { UserRequest } from './../../entity/UserRequest';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UserEntityRequest } from '../../entity/UserEntityRequest';
import { ComponentMainComponent } from '../main/component-main/component-main.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent extends ComponentMainComponent implements OnInit {
  userRequest!: UserEntityRequest;
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
    this.userRequest = new UserEntityRequest();
  }


  createUpdatePasswordChange() {
    this.serviceUser
      .updateUserPassword(
        this.userRequest?.password,
        this.userRequest.passwordChange,
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
    request.password = this.userRequest.passwordChange;
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
    this.userRequest = new UserEntityRequest();
  }

  onChangeValuesPassword() {
    this.validButton = this.validActiveButton();
  }

  onChangeValues() {
    this.validButton = this.validActiveButtonEdit();
  }

  validActiveButton(): boolean {
    return (
      this.userRequest.password?.trim() != '' &&
      this.userRequest.password != null &&
      this.userRequest.passwordChange?.trim() != '' &&
      this.userRequest.passwordChange != null
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
