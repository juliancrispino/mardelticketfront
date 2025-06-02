import { createReducer, on } from '@ngrx/store';
import { DataActions, ScreenStateActions } from './actions';
import { StateStructure } from "../redux/redux-state/StateStructure";
import { ScreenState } from "../redux/redux-state/ScreenState";

export const initialState: StateStructure =
{
  screenState: ScreenState.HOME,
  sessionDataDTO: undefined,
  userDataDTO: undefined,
  listaEventosDTO: undefined,
};

export const reduxReducer = createReducer(
  initialState,
  on(ScreenStateActions.setScreenState, (state, { screenState }) => {
    return ({ ...state, screenState: screenState })
  }
  ),
  on(DataActions.setSessionDataDTO, (state, { sessionDataDTO }) => {
    return ({ ...state, sessionDataDTO: sessionDataDTO })
  }
  ),
  on(DataActions.setUserDataDTO, (state, { userDataDTO }) => {
    return ({ ...state, userDataDTO: userDataDTO });
  }
  ),
  on(DataActions.setListaEventosDTO, (state, { listaEventosDTO }) => {
    return ({ ...state, listaEventosDTO: listaEventosDTO });
  }
  ),
  on(DataActions.setEventoDTO, (state, { eventoDTO }) => {
    return ({ ...state, eventoDTO: eventoDTO });
  }
  ),
  on(DataActions.clearSessionData, (state) => ({
    ...state,
    sessionDataDTO: undefined
  }))

);
