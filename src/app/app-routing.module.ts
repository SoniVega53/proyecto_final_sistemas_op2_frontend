import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './ui/home/home.component';
import { LoginComponent } from './ui/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthenticatedGuard } from './auth/AuthenticatedGuard';
import { RegisterComponent } from './ui/register/register.component';
import { PerfilComponent } from './ui/perfil/perfil.component';
import { DoctorCitasComponentComponent } from './ui/doctor-citas-component/doctor-citas-component.component';
import { DoctorPacientesComponentComponent } from './ui/doctor-pacientes-component/doctor-pacientes-component.component';
import { AuthGuardRolService } from './auth/auth-guard-rol.service';
import { ErrorPageComponent } from './ui/error-page/error-page.component';
import { CrearCitaComponent } from './ui/paciente/crear-cita/crear-cita.component';
import { VerRecetaComponent } from './ui/paciente/ver-receta/ver-receta.component';
import { ListadoUsuariosComponent } from './ui/admin/listado-usuarios/listado-usuarios.component';
import { CrearEspecialidadPageComponent } from './ui/admin/crear-especialidad-page/crear-especialidad-page.component';
import { UserAdministratePageComponent } from './ui/admin/user-administrate-page/user-administrate-page.component';
import { UserUpdatePageComponent } from './ui/admin/user-update-page/user-update-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'error', component: ErrorPageComponent },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthenticatedGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthenticatedGuard],
  },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
  {
    path: 'doctor',
    canActivate: [AuthGuardRolService],
    data: { roles: ['DOCTOR','ADMIN'] },
    children: [
      { path: 'citas', component: DoctorCitasComponentComponent },
      { path: 'pacientes', component: DoctorPacientesComponentComponent },
    ],
  },
  {
    path: 'paciente',
    canActivate: [AuthGuardRolService],
    data: { roles: ['USER','ADMIN'] },
    children: [
      { path: 'citas', component: CrearCitaComponent },
      { path: 'recetas', component: VerRecetaComponent },
    ],
  },
  {
    path: 'admin',
    canActivate: [AuthGuardRolService],
    data: { roles: ['ADMIN'] },
    children: [
      { path: 'listado-usaurios', component: ListadoUsuariosComponent },
      { path: 'especialidad', component: CrearEspecialidadPageComponent },
      { path: 'user-administrate', component: UserAdministratePageComponent },
      { path: 'user-editar', component: UserUpdatePageComponent },
    ],
  },


  { path: '**', redirectTo: '/error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
