import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CrearEventoComponent } from './pages/crear-evento/crear-evento.component';
import { RegistrarseComponent } from './pages/registrarse/registrarse.component';
import { IniciarSesionComponent } from './pages/iniciar-sesion/iniciar-sesion.component';


export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: HomeComponent },
  { path: 'crear-evento', component: CrearEventoComponent },
  { path: 'registrarse', component: RegistrarseComponent },
  { path: 'iniciar-sesion', component: IniciarSesionComponent },
];
