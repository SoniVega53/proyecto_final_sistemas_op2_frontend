import { Component, Input, input, OnInit } from '@angular/core';
import { ComponentMainComponent } from '../main/component-main/component-main.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor-citas-component',
  templateUrl: './doctor-citas-component.component.html',
  styleUrl: './doctor-citas-component.component.css',
})
export class DoctorCitasComponentComponent
  extends ComponentMainComponent
  implements OnInit
{

  listadoCitas: any[] = [];
  @Input() id_doc:any = '';
  @Input() email: any = '';

  ngOnInit(): void {
    if (!this.id_doc) {
      this.id_doc = this.doctor_id;
    }
    this.obtenerCitas();
  }

  obtenerCitas() {
    if (!this.id_doc)  return;
    this.appoService.getAllAppointmentsDoc(this.id_doc).subscribe((res) => {
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

    this.router.navigate(['/doctor/pacientes'], {
      queryParams: {
        data: data,
      },
    });
  }
}
