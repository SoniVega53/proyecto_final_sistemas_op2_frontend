import { Component, Input, OnInit } from '@angular/core';
import { ComponentMainComponent } from '../../main/component-main/component-main.component';
import Swal from 'sweetalert2';
import { Opcion } from '../../../entity/Opcion';

@Component({
  selector: 'app-crear-cita',
  templateUrl: './crear-cita.component.html',
  styleUrl: './crear-cita.component.css',
})
export class CrearCitaComponent
  extends ComponentMainComponent
  implements OnInit
{
  @Input() isCreate = true;
  @Input() id_pac: any = '';
  @Input() email: any = '';

  listadoDoctores: any[] = [];
  listadoDoctoresFilter: any[] = [];
  listadoEspecialidades: any[] = [];
  listadOp: Opcion[] = [];
  listadoCitas: any[] = [];
  citaRequest = '';
  selectDoctor = '';
  selectorEsp = '';
  isVisibleDoc = false;

  ngOnInit(): void {
    if (!this.id_pac) {
      this.id_pac = this.paciente_id;
    }

    this.obtenerDoctores();
    this.obtenerEspecialidades();
    this.obtenerCitas();
  }

  async obtenerDoctores() {
    this.docService.getAllDoctors().subscribe((res) => {
      if (res.code == '400') {
        Swal.fire({
          title: 'Error!',
          text: res?.message,
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
        console.error(res);
      } else {
        this.listadoDoctores = res;
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

  obtenerCitas() {
    if (!this.id_pac) return;
    this.appoService.getAllAppointmentsPac(this.id_pac).subscribe((res) => {
      if (res.code == '400') {
        Swal.fire({
          title: 'Error!',
          text: res?.message,
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
        console.error(res);
      } else {
        this.listadoCitas = res;
      }
    });
  }

  crearCitaComponent(request: any) {
    this.appoService.createAppointment(request).subscribe((res) => {
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
        this.obtenerCitas();
      }
    });
  }

  eliminarCita(id: any) {
    this.appoService.deleteAppointment(id).subscribe((res) => {
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
        this.obtenerCitas();
      }
    });
  }

  verReceta(item: any) {
    const data = JSON.stringify(item);

    this.router.navigate(['/paciente/recetas'], {
      queryParams: {
        data: data,
      },
    });
  }

  generarCita() {
    const request = {
      date: this.citaRequest,
      doctorId: this.selectDoctor,
      patientId: this.id_pac,
    };
    if (!request.date || !request.doctorId) return;
    this.crearCitaComponent(request);
  }

  onChangeValue(val: Opcion) {
    this.selectorEsp = val.texto;
    this.filtraDo()
  }

  onInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.filtraDo();
  }

  filtraDo() {
    if (this.esFechaValida(this.citaRequest)) {
      this.isVisibleDoc = true;

      this.listadoDoctoresFilter = this.listadoDoctores.filter(
        (res) => res.specialty == this.selectorEsp
      );
    }
  }

  esFechaValida(fecha: string): boolean {
    const date = new Date(fecha);
    const esValida =
      !isNaN(date.getTime()) && fecha === date.toISOString().split('T')[0];

    return esValida;
  }
}
