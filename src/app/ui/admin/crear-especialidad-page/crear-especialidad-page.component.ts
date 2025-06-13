import { Component, OnInit } from '@angular/core';
import { ComponentMainComponent } from '../../main/component-main/component-main.component';
import Swal from 'sweetalert2';
import { TablaEntity } from '../../../entity/TablaEntity';
import { ModalCreacionComponent } from '../../../component/modal-creacion/modal-creacion.component';

@Component({
  selector: 'crear-especialidad-page',
  templateUrl: './crear-especialidad-page.component.html',
  styleUrl: './crear-especialidad-page.component.css',
})
export class CrearEspecialidadPageComponent
  extends ComponentMainComponent
  implements OnInit
{
  formFields = [
    { type: 'text', placeholder: 'Nombre *', model: 'nombre', requiered: true },
    {
      type: 'text',
      placeholder: 'Descripcion',
      model: 'descripcion',
      requiered: false,
    },
  ];

  requestData: any = {};
  isUpdate: boolean = false;

  listadoHeader = ['Nombre', 'Descripcion'];
  listadoEspecialidades: any[] = [];
  listadoData: any = [];
  descripcionEmpty = 'No se encontro ninguna especialidad';

  async ngOnInit(): Promise<void> {
    await this.obtenerEspecialidades();
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
        console.log(res);
        this.listadoEspecialidades = res;
        this.listadoEspecialidades.map((val) => {
          const data = new TablaEntity(val.id, false, [
            val.nombre,
            val.descripcion,
          ]);
          this.listadoData.push(data);
        });
      }
    });
  }

  crearEspe(value: any) {
    this.docService
      .updateEspecialidad(this.requestData, this.requestData.id, this.isUpdate)
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
          Swal.fire({
            title: 'Success!',
            text: res?.message,
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
          this.obtenerEspecialidades();
          this.isUpdate = false;
          this.requestData = {};
        }
      });
  }

  onEliminar(item: any) {
    console.log(item);
    this.docService.eliminarEspecialidad(item.id).subscribe((res) => {
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
        this.obtenerEspecialidades();
      }
    });
  }

  onEditar(item: any) {
    this.requestData = this.listadoEspecialidades.find(
      (val) => val.id === item.id
    );
    this.isUpdate = true;
    this.onClickIdComponent('btn-especial-create_update');
  }
}
