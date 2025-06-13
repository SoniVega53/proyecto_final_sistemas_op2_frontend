import { Component, Input, OnInit } from '@angular/core';
import { ComponentMainComponent } from '../../main/component-main/component-main.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-receta',
  templateUrl: './ver-receta.component.html',
  styleUrl: './ver-receta.component.css',
})
export class VerRecetaComponent
  extends ComponentMainComponent
  implements OnInit
{
  @Input() isDoctor = false;

  textButonAgregar = 'Aceptar';

  recetaRequest: any = {
    id: '',
    appointmentId: '',
    medication: '',
    dosage: '',
  };

  dataCita: any;
  listadoRecetas: any[] = [];

  ngOnInit(): void {
    if (!this.isDoctor) {
      this.isDoctor = this.rol_user === 'ADMIN';
    }
    this.route.queryParams.subscribe((params) => {
      this.dataCita = JSON.parse(params['data']);
      this.recetaRequest.appointmentId = this.dataCita.id;
    });
    this.obtenerCitasPres();
  }

  obtenerCitasPres() {
    this.prescService
      .getAllPrescriptionsCita(this.dataCita.id)
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
          this.listadoRecetas = res;
        }
      });
  }

  createReceta() {
    if (
      !this.recetaRequest.appointmentId ||
      !this.recetaRequest.medication ||
      !this.recetaRequest.dosage
    )
      return;

    if (!this.recetaRequest?.id) {
      this.prescService
        .createPrescription(this.recetaRequest)
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
            this.obtenerCitasPres();
            this.recetaRequest.medication = '';
            this.recetaRequest.dosage = '';
          }
        });
    } else {
      this.prescService
        .updatePrescription(this.recetaRequest.id, this.recetaRequest)
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
            this.obtenerCitasPres();
            this.recetaRequest.medication = '';
            this.recetaRequest.dosage = '';
            this.recetaRequest.id = '';
          }
        });
    }
  }

  editarReceta(item: any) {
    this.recetaRequest.medication = item.medication;
    this.recetaRequest.dosage = item.dosage;
    this.recetaRequest.id = item.id;
  }

  eliminarReceta(id: any) {
    this.prescService.deletePrescription(id).subscribe((res) => {
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
        this.obtenerCitasPres();
      }
    });
  }
}
