import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Opcion } from '../../entity/Opcion';

@Component({
  selector: 'modal-creacion',
  templateUrl: './modal-creacion.component.html',
  styleUrl: './modal-creacion.component.css',
})
export class ModalCreacionComponent {
  @Input() modalId: string = 'dynamicModal';
  @Input() title: string = 'Formulario';
  @Input() fields: {
    type: string;
    placeholder: string;
    model: string;
    requiered: boolean;
    listado?: Opcion[];
  }[] = [];

  @Input() modelData: any = {};

  @Output() formSubmit = new EventEmitter<any>();

  get validButton(): boolean {
    return this.fields.every((field) => {
      if (field.requiered) {
        const value = this.modelData[field.model];
        return value !== null && value !== undefined && value !== '';
      }
      return true;
    });
  }
  onSubmit() {
    this.formSubmit.emit(this.modelData);
  }

  closeModal() {
    const ele = document.getElementById('close-modal-id');
    if (ele) {
      ele.click;
    }
  }
}
