import {NgModule} from "@angular/core";
import {Store, StoreModule} from "@ngrx/store";
import {DataActions, ScreenStateActions} from "../redux/actions";
import {reduxReducer} from "../redux/reducer";
import {ScreenState} from "../redux/redux-state/ScreenState";
import { EventoDTO } from "../dto/EventoDTO";


@NgModule({
  declarations: [],
  imports: [StoreModule.forRoot({_STATE_: reduxReducer})],
  providers: [],
  bootstrap: [],
  exports: []
})
export class AppNavigationLogic {
  constructor(private store: Store) {}


  public goLoginScreen() {
    this.store.dispatch(ScreenStateActions.setScreenState({screenState: ScreenState.LOGIN}))
  }

  public goRegisterScreen() {
    this.store.dispatch(ScreenStateActions.setScreenState({screenState: ScreenState.REGISTER}))
  }

  public goHomeScreen() {
    this.store.dispatch(ScreenStateActions.setScreenState({screenState: ScreenState.HOME}))
  }

  public goCreateEventScreen() {
    this.store.dispatch(ScreenStateActions.setScreenState({screenState: ScreenState.CREATE_EVENT}))
  }

  public goEventsScreen(evento: EventoDTO) {
    this.store.dispatch(DataActions.setEventoDTO({ eventoDTO : evento }));
    this.store.dispatch(ScreenStateActions.setScreenState({screenState: ScreenState.EVENTS}))
  }

  public goEventsListScreen() {
    this.store.dispatch(ScreenStateActions.setScreenState({screenState: ScreenState.EVENTS_LIST}))
  }

  public goSuccesNotification() {
    this.store.dispatch(ScreenStateActions.setScreenState({screenState: ScreenState.SUCCES_NOTIFICATION}))
  }

  public goBuyTicketScree() {
    this.store.dispatch(ScreenStateActions.setScreenState({screenState: ScreenState.BUY_TICKET}))
  }


}
