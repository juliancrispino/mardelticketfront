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
        // console.log("selectSessionData: value = ", value); //DEBUG
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
    // Navigation to home page
    this.appNavigation.goHomeScreen();
    return true;
  }




}
