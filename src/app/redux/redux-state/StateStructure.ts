// import { ModuloFrontDTO } from "../../dto/moduloFrontDTO";
import { SessionDataDTO } from "../../dto/sessionDataDTO";
import { UserDataDTO } from "../../dto/userDataDTO";
import { ScreenState } from "./ScreenState";

export interface StateStructure {
  // SCREEN
  screenState?: ScreenState,
  // AUTH
  sessionDataDTO?: SessionDataDTO,
  userDataDTO?: UserDataDTO,

  // APP
//   idMedidor?: string,
//   listaModulos?: ModuloFrontDTO[],
//   moduloData?: ModuloFrontDTO
}
