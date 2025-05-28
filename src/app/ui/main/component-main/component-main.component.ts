import { Component, ElementRef } from '@angular/core';
import { AuthApiService } from '../../../service/auth-api.service';
import { UserApiService } from '../../../service/user-api.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CodemirrorComponent } from '@ctrl/ngx-codemirror';
import { EncryptionService } from '../../../entity/EncryptionService';

@Component({
  selector: 'app-component-main',
  templateUrl: './component-main.component.html',
  styleUrl: './component-main.component.css',
})
export class ComponentMainComponent {
  username: String = '';
  rootAccess: boolean = false;
  editorInstance: any;

  constructor(
    public authService: AuthApiService,
    public router: Router,
    public route: ActivatedRoute,
    public serviceUser: UserApiService,
    public encripService: EncryptionService
  ) {
    this.getDataUserPerfile();
    this.rootAccess = this.serviceUser.getRootAccess();
  }
  getDataUserPerfile() {
    const data = this.serviceUser.getData();
    if (data) {
      this.username = data?.username ?? '';
    }
  }

  obtenerTextoSeleccionado(codeEditor: CodemirrorComponent): string {
    if (codeEditor.codeMirror) {
      console.log(codeEditor.codeMirror.getSelection());
      const texto = codeEditor.codeMirror?.getSelection();
      return texto && texto.length > 0 ? texto : '';
    }
    return '';
  }
}
