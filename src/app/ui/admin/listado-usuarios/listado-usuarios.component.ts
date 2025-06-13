import { Opcion } from './../../../entity/Opcion';
import { UserApiService } from '../../../service/user-api.service';
import { Component, Input, OnInit } from '@angular/core';
import { ComponentMainComponent } from '../../main/component-main/component-main.component';
import Swal from 'sweetalert2';
import { TablaEntity } from '../../../entity/TablaEntity';

@Component({
  selector: 'listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrl: './listado-usuarios.component.css',
})
export class ListadoUsuariosComponent
  extends ComponentMainComponent
  implements OnInit
{
  @Input() isTitle = true;
  @Input() opciones = true;

  usersList: any[] = [];
  listadoData: any[] = [];
  listadoEspecialidades: any[] = [];
  listadoEspecialidadesOP: Opcion[] = [];
  listadoHeader = ['Usuario', 'Email', 'rol'];
  descripcionEmpty = 'No se encontro Usuarios';

  formFields = [
    {
      type: 'text',
      placeholder: 'Nombre de Usuario *',
      model: 'username',
      requiered: true,
    },
    { type: 'text', placeholder: 'Nombre *', model: 'name', requiered: true },
    {
      type: 'text',
      placeholder: 'Apellido *',
      model: 'lastname',
      requiered: true,
    },
    {
      type: 'email',
      placeholder: 'Correo Electrónico *',
      model: 'email',
      requiered: true,
    },
    {
      type: 'password',
      placeholder: 'Contraseña *',
      model: 'password',
      requiered: true,
    },
    {
      type: 'password',
      placeholder: 'Repetir Contraseña *',
      model: 'passwordChange',
      requiered: true,
    },
    { type: 'text', placeholder: 'Rol *', model: 'rol', requiered: true },
    {
      type: 'select',
      placeholder: 'Seleccione Especialidad',
      model: 'specialty',
      requiered: false,
      listado: this.listadoEspecialidadesOP,
    },
    { type: 'tel', placeholder: 'Teléfono', model: 'phone', requiered: false },
  ];

  requestData: any = {};

  editarUsuario(value: any) {}
  eliminarUser(value: any) {}

  ngOnInit(): void {
    this.obtenerListado_usurios();
    this.obtenerEspecialidades();
  }

  obtenerListado_usurios() {
    this.usersList = [];
    this.listadoData = [];

    this.serviceUser.getAllUsers().subscribe((res) => {
      if (res.code == '400') {
        Swal.fire({
          title: 'Error!',
          text: res?.message,
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      } else {
        const list: Array<any> = [
          ...(res?.filter((val: { rol: string }) => val.rol === 'DOCTOR') ||
            []),
          ...(res?.filter((val: { rol: string }) => val.rol === 'USER') || []),
        ];

        list.map((val) => {
          this.usersList.push(val);
        });

        this.usersList.map((val) => {
          const id = val.rol === 'DOCTOR' ? val.doctor.id : val.paciente.id

          const data = new TablaEntity(val.id, id,false, [
            val.username,
            val.email,
            val.rol,
          ]);
          this.listadoData.push(data);
        });
      }
    });
  }

  async obtenerEspecialidades() {
    this.listadoData = [];
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
          this.listadoEspecialidadesOP.push({
            code: val.id,
            texto: val.nombre,
          });
        });
      }
    });
  }

  onClickItem(event: any) {
    this.router.navigate(['/admin/user-administrate'], {
      queryParams: {
        data: JSON.stringify(event),
      },
    });
  }

  onEliminar(item: any) {
    this.messageEliminar(() => {
      this.serviceUser.deleteUsuario(item.id).subscribe((res) => {
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
          this.obtenerListado_usurios();
        }
      });
    });
  }

  onEditar(item: any) {
    this.router.navigate(['/admin/user-editar'], {
      queryParams: {
        data: JSON.stringify(item),
      },
    });
  }

  crearUser(item: any) {}
}
