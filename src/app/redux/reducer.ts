import { createReducer, on } from '@ngrx/store';
import { DataActions, ScreenStateActions } from './actions';
import { StateStructure } from "../redux/redux-state/StateStructure";
import { ScreenState } from "../redux/redux-state/ScreenState";

export const initialState: StateStructure =
{
  screenState: ScreenState.HOME,
  sessionDataDTO: undefined,
  userDataDTO: undefined,
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
 
);
