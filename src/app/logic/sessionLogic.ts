import { NgModule } from "@angular/core";
import { Store, StoreModule } from "@ngrx/store";
import { AppNavigationLogic } from "./navigationLogic";
import { HttpService } from "../service/HttpService";
import { DataActions } from "../redux/actions";
import { SessionDataDTO } from "../dto/sessionDataDTO";
import { reduxReducer } from "../redux/reducer";
import { ResponseDTO } from "../dto/ResponseDTO";
import Swal from "sweetalert2";


@NgModule({
  imports: [StoreModule.forRoot({ _STATE_: reduxReducer })],
})
export class SessionLogic {

  private SESSION_KEY = "NFT_MEDICIONES_SESSION_DATA"
  private SESSION_DURATION = 30 * 24 * 60 * 60 * 1000  //Miliseconds (30 days)

  constructor(private httpService: HttpService,
    private store: Store,
    private appNavigation: AppNavigationLogic,) {
  }


  public async login(email: string, password: string): Promise<boolean> {
    return new Promise(resolve => {
      let loginBody = {
        "email": email,
        "password": password,
      }
      console.log("BODY A MANDAR: ", loginBody)
      this.httpService.login(loginBody)
        .subscribe((response) => {
          console.log("response de login: ", response); //DEBUG
          if (response.success) {    // Login SUCCESS
            let sessionDataDTO = {
              "userIdentification": response.data.id,
              "name": response.data.userName,
              "email": response.data.email,
              "authToken": response.data.token,
            }
            // Redux session data dispatch
            this.store.dispatch(DataActions.setSessionDataDTO({ sessionDataDTO: sessionDataDTO }));
            // Save sessionData on LocalStorage
            this.setWithExpiry(this.SESSION_KEY, sessionDataDTO, this.SESSION_DURATION)
            resolve(true);
          } else {                        // Login FAIL
            Swal.fire({
              icon: "error",
              text: "Usuario/Contraseña incorrecto",
              timer: 3000,
              timerProgressBar: true
            });
            resolve(false);
          }
        }, (error) =>{
          Swal.fire({
            icon: "error",
            text: "Se produjo un error de serviror",
            footer: "Por favor, intente nuevamente"
          });
          resolve(false)

        })
    })
  };

  getSessionLocalData(): SessionDataDTO | null {
    const sessionString = localStorage.getItem(this.SESSION_KEY);
    if (!sessionString) return null;

    const session = JSON.parse(sessionString);
    const now = new Date();

    if (now.getTime() > session.expiry) {
      localStorage.removeItem(this.SESSION_KEY); // Eliminar si expiró
      return null;
    }

    return session.sessionDataDTO;
  }


  private setWithExpiry(key: string, sessionDataDTO: SessionDataDTO, duration: number) {
    const now = new Date()
    const session = {
      sessionDataDTO: sessionDataDTO,
      expiry: now.getTime() + duration,
    };
    localStorage.setItem(key, JSON.stringify(session));
  }

  loginWhithLocalData() {
    let sessionDataDTO =  this.getSesionLocalData();
    if (sessionDataDTO){
      //TODO mecanismo de logueo con token
    }
  }

  getSesionLocalData() {
    let sessionString = localStorage.getItem(this.SESSION_KEY)
    if (sessionString) {
      let session = JSON.parse(sessionString);
      // console.log(sessionString) //DEBUG
      if (session?.expiry > new Date().getTime()) {
        // console.log("sesion valida") //DEBUG
        return session.sessionDataDTO;
      } else {
        // console.log("sesion expirada") //DEBUG
        localStorage.clear();
      }
    }
    return null;
  }

  public logout() {
    localStorage.clear();
    this.appNavigation.goLoginScreen();
  }

    // async changePassword(editUserDTO: EditUserDTO): Promise<ResponseDTO> {
    //   return await new Promise(resolve => {
    //     this.httpService.changePassword(editUserDTO)
    //       .subscribe((response: ResponseDTO) => {
    //         // console.log("response de changePassword: ", response); //DEBUG
    //         resolve(response);
    //       })
    //   })
    // }

}

