import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";



@Injectable(
  { providedIn: 'root' }
)
export class HttpService {
  private BASE_URL = 'http://localhost:8080/api'

  constructor(private http: HttpClient) { }

  public login(body: any): Observable<any> {
    return this.http.post(this.BASE_URL + "/user/login", body);
  }

  // USUARIOS
//   crearNuevoUsuario(addUsuarioDTO: AddUsuarioDTO): Observable<ResponseDTO> {
//     return this.http.post(this.BASE_URL + "/user/register", addUsuarioDTO);
//   }

//   changePassword(editUserDTO: EditUserDTO): Observable<ResponseDTO> {
//     return this.http.post(this.BASE_URL + "/user/changePassword", editUserDTO);
//   }

//   //RECOVERY PASSWORD
//   public recoveryPassword(mail: any): Observable<any> {
//     return this.http.post(this.BASE_URL + "/user/forgot_password", mail);
//   }



}
