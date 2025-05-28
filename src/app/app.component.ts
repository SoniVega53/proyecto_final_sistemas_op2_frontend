import { Component, isDevMode } from '@angular/core';
import { AuthApiService } from './service/auth-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sistemas_op_umg2025_frontend';

  constructor(private authService: AuthApiService){

  }

  isValidtAuth():boolean{
    return this.authService.isAuthenticated();
  }
}
