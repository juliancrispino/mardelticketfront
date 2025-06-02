import {createAction, createActionGroup, emptyProps, props} from '@ngrx/store';
import {ScreenState} from "../redux/redux-state/ScreenState";
import { SessionDataDTO } from '../dto/sessionDataDTO';
import {UserDataDTO} from "../dto/userDataDTO";
import { EventoDTO } from '../dto/EventoDTO';


export const ScreenStateActions = createActionGroup({
  source: 'ScreenState',
  events: {
    'setScreenState': props<{ screenState: ScreenState }>(),
  },
});

export const DataActions = createActionGroup({
  source: 'Data',
  events: {
    'setSessionDataDTO': props<{ sessionDataDTO: SessionDataDTO }>(),
    'setUserDataDTO': props<{ userDataDTO: UserDataDTO }>(),
    'Clear Session Data': emptyProps(),
    'setListaEventosDTO': props<{ listaEventosDTO: EventoDTO[] }>(),
    'setEventoDTO': props<{ eventoDTO: EventoDTO }>(),
  },
});
