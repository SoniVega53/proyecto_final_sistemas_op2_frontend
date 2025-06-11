import { Component } from '@angular/core';
import { UserApiService } from '../../service/user-api.service';
import { AuthApiService } from '../../service/auth-api.service';
import { ComponentMainComponent } from '../main/component-main/component-main.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent extends ComponentMainComponent {
  arrayUser = ['root', 'admin_cluster'];

  logout() {
    this.authService.logout();
  }

  isValidUserAdmin(): boolean {
    let rol: String = this.getDataUser().rol?.toString();
    return rol.toUpperCase() === 'ADMIN';
  }

  isValidUserDoc(): boolean {
    let rol: String = this.getDataUser().rol?.toString();
    return rol.toUpperCase() === 'DOCTOR';
  }

  isValidUserPaci(): boolean {
    let rol: String = this.getDataUser().rol?.toString();
    return rol.toUpperCase() === 'USER';
  }
}
