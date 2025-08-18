import { Injectable, NgModule } from "@angular/core";
import { Store, StoreModule } from "@ngrx/store";
import { SessionLogic } from "./sessionLogic";
import { AppNavigationLogic } from "./navigationLogic";
import { reduxReducer } from "../redux/reducer";
import { HttpService } from "../service/HttpService";
import { DataActions } from "../redux/actions";
import { SessionDataDTO } from "../dto/sessionDataDTO";
import { AppSelectors } from "../redux/selectors";
import { ResponseDTO } from "../dto/ResponseDTO";
import { firstValueFrom, Observable } from "rxjs";
import { UserDataDTO } from "../dto/userDataDTO";
import { EventoDTO } from "../dto/EventoDTO";
import { CompraRequestDTO } from "../dto/CompraRequestDTO";


@NgModule({
  imports: [StoreModule.forRoot({ _STATE_: reduxReducer })],
})
export class ServiceLogic {

  private sessionDataDTO?: SessionDataDTO;

  constructor(
    private store: Store,
    private httpService: HttpService,
    private sessionLogic: SessionLogic,
    private appNavigation: AppNavigationLogic
  ) {
    // REDUX
    this.store.select(AppSelectors.selectSessionData)
      .subscribe(value => {
        console.log("selectSessionData: value = ", value); //DEBUG
        this.sessionDataDTO = value;
      })

  }

  public async oninitDeApp() {

    const sessionData = this.sessionLogic.getSessionLocalData();
    if (sessionData) {
      this.store.dispatch(DataActions.setSessionDataDTO({ sessionDataDTO: sessionData }));
      this.appNavigation.goHomeScreen(); // Ir directamente a la pantalla principal
    } else {
//       this.buttonLogin("user01", "1234"); // Descomentar para auto-login de prueba
    }

    this.obtenerEventos();
  }

  public buttonLogout() {
    this.sessionLogic.logout();
  }

  public async buttonLogin(userName: string, password: string): Promise<boolean> {
    // Login
    let loginSucces: boolean = await this.sessionLogic.login(userName, password);
    console.log("LoginSucces: ", loginSucces);
    if (!loginSucces) {
      return false; // Login Failure
    }
    // Login Successful
    this.appNavigation.goHomeScreen();
    return true;
  }

    async crearNuevoUsuario(userDataDTO: UserDataDTO): Promise<ResponseDTO> {
    return await new Promise(resolve => {
      this.httpService.crearNuevoUsuario(userDataDTO)
        .subscribe((response: ResponseDTO) => {
          console.log("response de crearNuevoUsuario: ", response); //DEBUG
          resolve(response);
        })
    })
  }

  async crearNuevoEvento( eventoDTO : EventoDTO): Promise<ResponseDTO> {
    console.log("EVENTO SERVICE: ", eventoDTO)
    return await new Promise(resolve => {
      this.httpService.crearNuevoEvento(eventoDTO)
        .subscribe((response: ResponseDTO) => {
          console.log("response de crearNuevoUsuario: ", response); //DEBUG
          resolve(response);
        })
    })
  }

  async obtenerEventos(): Promise<EventoDTO[]> {
    return await new Promise(resolve => {
      this.httpService.obtenerEventos()
        .subscribe((response: any) => {
          console.log("response de obtenerEventos: ", response); //DEBUG
           this.store.dispatch(DataActions.setListaEventosDTO({ listaEventosDTO: response }));
          resolve(response);
        })
    })
  }

  async nuevaCompra(compraRequestDTO: CompraRequestDTO): Promise<ResponseDTO> {
    return await new Promise(resolve => {
      this.httpService.comprarEntradas(compraRequestDTO)
        .subscribe((response: ResponseDTO) => {
          console.log("response de nuevaCompra: ", response); //DEBUG
          resolve(response);
        })
    })
  }

  

  async obtenerEventosDeUsuario(email:string): Promise<EventoDTO[]> {
    return await new Promise(resolve => {
      this.httpService.obtenerEventosDeUsuario(email)
        .subscribe((response: any) => {
          console.log("response de obtenerEventosDeUsuario: ", response); //DEBUG
           this.store.dispatch(DataActions.setListaEventosDeUsuarioDTO({ listaEventosDTO: response }));
          resolve(response);
        })
    })
  }



}
