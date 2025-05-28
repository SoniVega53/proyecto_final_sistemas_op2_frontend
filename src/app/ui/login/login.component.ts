import { UserRequest } from './../../entity/UserRequest';
import {
  Component,
  OnInit,
} from '@angular/core';
import Swal from 'sweetalert2';
import { ComponentMainComponent } from '../main/component-main/component-main.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent extends ComponentMainComponent implements OnInit {
  userRequest!: UserRequest;
  validButton: boolean = false;
  public myProperty: boolean = false;

  ngOnInit(): void {
    this.userRequest = new UserRequest();
  }

  login() {
    this.authService.login(this.userRequest).subscribe((res) => {
      if (res.code == '400') {
        Swal.fire({
          title: 'Error!',
          text: res?.message,
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      } else {
        const userEn = this.encripService.encrypt(res?.entity);
        localStorage.setItem('usuario', userEn);
        this.router.navigate(['/home']);
      }
    });
  }

  onChangeValues() {
    this.validButton = this.validActiveButton();
  }

  validActiveButton(): boolean {
    return (
      this.userRequest.username?.trim() != '' &&
      this.userRequest.username != null &&
      this.userRequest.password?.trim() != '' &&
      this.userRequest.password != null
    );
  }
}
