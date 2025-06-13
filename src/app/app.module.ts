import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration,} from '@angular/platform-browser';
import { HttpClientModule,HTTP_INTERCEPTORS  } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './ui/home/home.component';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { LoginComponent } from './ui/login/login.component';
import { RegisterComponent } from './ui/register/register.component';
import { PerfilComponent } from './ui/perfil/perfil.component';
import { IsEmptyComponent } from './ui/is-empty/is-empty.component';
import { ComponentMainComponent } from './ui/main/component-main/component-main.component';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { DoctorCitasComponentComponent } from './ui/doctor-citas-component/doctor-citas-component.component';
import { DoctorPacientesComponentComponent } from './ui/doctor-pacientes-component/doctor-pacientes-component.component';
import { ErrorPageComponent } from './ui/error-page/error-page.component';
import { CrearCitaComponent } from './ui/paciente/crear-cita/crear-cita.component';
import { VerRecetaComponent } from './ui/paciente/ver-receta/ver-receta.component';
import { ListadoUsuariosComponent } from './ui/admin/listado-usuarios/listado-usuarios.component';
import { InputSelectorComponent } from './component/input-selector/input-selector.component';
import { CrearEspecialidadPageComponent } from './ui/admin/crear-especialidad-page/crear-especialidad-page.component';
import { TableBaseComponent } from './component/table-base/table-base.component';
import { InputBaseComponent } from './component/input-base/input-base.component';
import { ItemNavbarComponent } from './component/item-navbar/item-navbar.component';
import { ContenidoMdComponent } from './component/contenido-md/contenido-md.component';
import { ModalCreacionComponent } from './component/modal-creacion/modal-creacion.component';
import { UserAdministratePageComponent } from './ui/admin/user-administrate-page/user-administrate-page.component';
import { UserUpdatePageComponent } from './ui/admin/user-update-page/user-update-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    PerfilComponent,
    IsEmptyComponent,
    ComponentMainComponent,
    DoctorCitasComponentComponent,
    DoctorPacientesComponentComponent,
    ErrorPageComponent,
    CrearCitaComponent,
    VerRecetaComponent,
    ListadoUsuariosComponent,
    InputSelectorComponent,
    CrearEspecialidadPageComponent,
    TableBaseComponent,
    InputBaseComponent,
    ItemNavbarComponent,
    ContenidoMdComponent,
    ModalCreacionComponent,
    UserAdministratePageComponent,
    UserUpdatePageComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule,CodemirrorModule],
  providers: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
