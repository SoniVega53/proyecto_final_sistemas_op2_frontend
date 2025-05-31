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

  listadoDoctores: any[] = [];
  listadoCitas: any[] = [];
  citaRequest = '';
  selectDoctor = '';

  ngOnInit(): void {
    this.obtenerDoctores();
    this.obtenerCitas();
  }

  obtenerDoctores() {
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

  obtenerCitas() {
    this.appoService
      .getAllAppointmentsPac(this.paciente_id)
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
}
