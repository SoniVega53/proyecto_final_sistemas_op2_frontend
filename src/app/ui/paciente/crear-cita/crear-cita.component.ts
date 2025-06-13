import { Component, Input, OnInit } from '@angular/core';
import { ComponentMainComponent } from '../../main/component-main/component-main.component';
import Swal from 'sweetalert2';

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
  listadoEspecialidades: any[] = [];
  listadoCitas: any[] = [];
  citaRequest = '';
  selectDoctor = '';
  selectorEsp = '';

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
      }
    });
  }

  obtenerCitas() {
    if (!this.id_pac) return;
    this.appoService
      .getAllAppointmentsPac(this.id_pac)
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
      patientId: this.paciente_id,
    };
    console.log(request);
    if (!request.date || !request.doctorId) return;
    this.crearCitaComponent(request);
  }

  onChangeValue(event: any) {}
}
