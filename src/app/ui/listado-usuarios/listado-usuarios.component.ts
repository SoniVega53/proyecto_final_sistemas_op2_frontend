import { UserApiService } from './../../service/user-api.service';
import { Component, OnInit } from '@angular/core';
import { ComponentMainComponent } from '../main/component-main/component-main.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrl: './listado-usuarios.component.css',
})
export class ListadoUsuariosComponent
  extends ComponentMainComponent
  implements OnInit
{
  usersList: any[] = [];

  editarUsuario(value: any) {}
  eliminarUser(value: any) {}

  ngOnInit(): void {
    this.obtenerListado_usurios();
  }

  obtenerListado_usurios() {
    this.serviceUser.getAllUsers().subscribe((res) => {
      if (res.code == '400') {
        Swal.fire({
          title: 'Error!',
          text: res?.message,
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      } else {
        console.log(res);
        const list: Array<any> = [
          ...(res?.filter((val: { rol: string }) => val.rol === 'DOCTOR') ||[]),
          ...(res?.filter((val: { rol: string }) => val.rol === 'USER') || []),
          ...(res?.filter((val: { rol: string }) => val.rol === 'ADMIN') || []),
        ];

        list.map((val) => {
          val.enable = val.rol === 'ADMIN';
          this.usersList.push(val);
        });
      }
    });
  }
}
