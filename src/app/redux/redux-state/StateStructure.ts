// import { ModuloFrontDTO } from "../../dto/moduloFrontDTO";
import { EventoDTO } from "../../dto/EventoDTO";
import { SessionDataDTO } from "../../dto/sessionDataDTO";
import { UserDataDTO } from "../../dto/userDataDTO";
import { ScreenState } from "./ScreenState";

export interface StateStructure {
  // SCREEN
  screenState?: ScreenState,
  // AUTH
  sessionDataDTO?: SessionDataDTO,
  userDataDTO?: UserDataDTO,
  listaEventosDTO?: EventoDTO[],

  // APP
//   idMedidor?: string,
//   listaModulos?: ModuloFrontDTO[],
//   moduloData?: ModuloFrontDTO
}
