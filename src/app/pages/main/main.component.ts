import { ApplicationModule, Component } from '@angular/core';
import { ScreenState } from '../../redux/redux-state/ScreenState';
import { provideStore, Store, StoreModule } from '@ngrx/store';
import { StateStructure } from '../../redux/redux-state/StateStructure';
import { AppSelectors } from '../../redux/selectors';
import { ServiceLogic } from '../../logic/serviceLogic';
import { HeaderComponent } from "../../components/header/header.component";
import { IniciarSesionComponent } from "../iniciar-sesion/iniciar-sesion.component";
import { HomeComponent } from "../home/home.component";
import { RegistrarseComponent } from "../registrarse/registrarse.component";
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../../components/footer/footer.component";
import { AppModule } from '../../app.component';
import { CrearEventoComponent } from "../crear-evento/crear-evento.component";
import { SuccesNotificationComponent } from "../../components/succes-notification/succes-notification.component";
import { ListaEventosComponent } from "../lista-eventos/lista-eventos.component";
import { DetalleEventoComponent } from "../detalle-evento/detalle-evento.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [AppModule, CommonModule, IniciarSesionComponent, HomeComponent, RegistrarseComponent, HeaderComponent, FooterComponent, CrearEventoComponent, SuccesNotificationComponent, ListaEventosComponent, DetalleEventoComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  protected readonly ScreenState = ScreenState;
  public screenState$: ScreenState | undefined;

  constructor(private store: Store<StateStructure>,
    private serviceLogic: ServiceLogic) {
    // REDUX
    this.store.select(AppSelectors.selectScreenState)
      .subscribe(value => {
        // console.log(this.screenState$, "=>", value) // DEBUG
        this.screenState$ = value
      })

    this.serviceLogic.oninitDeApp();
    console.log("this.screenState: ", this.screenState$)
  }

}
