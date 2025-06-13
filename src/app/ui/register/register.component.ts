import { Opcion } from './../../entity/Opcion';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ComponentMainComponent } from '../main/component-main/component-main.component';
import { UserRequest } from '../../entity/UserRequest';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent
  extends ComponentMainComponent
  implements OnInit
{
  userRequest!: UserRequest;
  validButton: boolean = false;
  listadoEspecialidades: any[] = [];
  listadOp: Opcion[] = [];
  selectOp = '';
  public myProperty: boolean = false;

  ngOnInit(): void {
    this.userRequest = new UserRequest();
    this.userRequest.rol = '';
    this.obtenerEspecialidades();
  }

  onChangeValues() {
    this.validButton = this.validActiveButton();
  }

  onChangeRol() {
    if (this.userRequest.rol !== 'DOCTOR') {
      this.userRequest.specialty = '';
    }
  }

  validActiveButton(): boolean {
    return (
      this.userRequest.username?.trim() != '' &&
      this.userRequest.username != null &&
      this.userRequest.password?.trim() != '' &&
      this.userRequest.password != null &&
      this.userRequest.rol?.trim() != '' &&
      this.userRequest.rol != null
    );
  }

  registerUser() {

    this.authService.register(this.userRequest).subscribe((res) => {
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
    this.authService.login(this.userRequest).subscribe((res) => {
      if (res.code == '400') {
        Swal.fire({
          title: 'Error!',
          text: res?.message,
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      } else {
        Swal.fire({
          title: 'Success!',
          text: res?.message,
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        const userEn = this.encripService.encrypt(res?.entity);
        localStorage.setItem('usuario', userEn);
        this.router.navigate(['/home']);
      }
    });
  }

  async obtenerEspecialidades() {
    this.listadOp = [];
    this.docService.getAllspeciality().subscribe((res) => {
      if (res.code == '400') {
        Swal.fire({
          title: 'Error!',
          text: res?.message,
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
        console.error(res);
      } else {
        this.listadoEspecialidades = res;
        this.listadoEspecialidades.map((val) => {
          const data: Opcion = { code: val.id, texto: val.nombre };
          this.listadOp.push(data);
        });
      }
    });
  }

  onChangeValue(val: Opcion) {
    this.userRequest.specialty = val.texto;
  }
}
