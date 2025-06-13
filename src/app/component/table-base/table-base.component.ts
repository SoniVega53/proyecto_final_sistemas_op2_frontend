import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TablaEntity } from '../../entity/TablaEntity';

@Component({
  selector: 'table-base',
  templateUrl: './table-base.component.html',
  styleUrl: './table-base.component.css',
})
export class TableBaseComponent {
  @Input() listadoHeader: Array<string> = [];
  @Input() listadoData: any = [];
  @Input() descripcionEmpty = '';
  @Input() opciones = true;
  @Output() onEliminar = new EventEmitter<any>();
  @Output() onEditar = new EventEmitter<any>();
  @Output() onClickItem = new EventEmitter<any>();


  example = [
    {
      value: ['Juan Pérez', 'juan@email.com', 'Administrador'],
      enable: false
    }];

  constructor() {}

  eliminarUser(item: any) {
    if (this.onEliminar) {
      this.onEliminar.emit(item);
    }
  }

  editarUsuario(item: any) {
    if (this.onEditar) {
      this.onEditar.emit(item);
    }
  }
  clickItem(item: any) {
    if (this.onClickItem) {
      this.onClickItem.emit(item);
    }
  }
}
