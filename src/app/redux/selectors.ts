import {createFeatureSelector, createSelector} from "@ngrx/store";
import {StateStructure} from "../redux/redux-state/StateStructure";


const selectStateModule = createFeatureSelector<StateStructure>("_STATE_")

const selectState = createSelector(
  selectStateModule, (state) => state
)
const selectUserData = createSelector(
  selectStateModule, (state) => state.userDataDTO
)
const selectScreenState = createSelector(
  selectStateModule, (state) => state.screenState
)
const selectSessionData = createSelector(
  selectStateModule, (state) => state.sessionDataDTO
)
const selectListaEventos = createSelector(
  selectStateModule, (state) => state.listaEventosDTO
)



export const AppSelectors = {
  selectState,
  selectUserData,
  selectScreenState,
  selectSessionData,
  selectListaEventos,
}
