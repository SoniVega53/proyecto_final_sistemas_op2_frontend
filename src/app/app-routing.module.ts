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
    data: { roles: ['DOCTOR'] },
    children: [
      { path: 'citas', component: DoctorCitasComponentComponent },
      { path: 'pacientes', component: DoctorPacientesComponentComponent },
    ],
  },
  {
    path: 'paciente',
    canActivate: [AuthGuardRolService],
    data: { roles: ['USER'] },
    children: [
      { path: 'citas', component: CrearCitaComponent },
      { path: 'recetas', component: VerRecetaComponent },
    ],
  },

  { path: '**', redirectTo: '/error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
