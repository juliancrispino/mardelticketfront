import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppNavigationLogic } from '../../logic/navigationLogic';
import { Store } from '@ngrx/store';
import { AppSelectors } from '../../redux/selectors';
import { Subscription } from 'rxjs';
import { DataActions } from '../../redux/actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit{
  
  menuAbierto = false;
  userIdentification: string | undefined;
  fullName: string | undefined;
  private sessionSubscription!: Subscription;
  
  constructor(
    private appNavigation: AppNavigationLogic,
    private store: Store,
  ){
    // REDUX
    this.store.select(AppSelectors.selectSessionData)
      .subscribe(value => {
        this.userIdentification = value?.userIdentification;
        this.fullName = value?.name;
      })
  }

    ngOnInit(): void {
    this.sessionSubscription = this.store.select(AppSelectors.selectSessionData)
      .subscribe(value => {
        this.fullName = value?.name;
      });
  }
  
  public goMisEventos(){
    this.menuAbierto = false;
    this.appNavigation.goMyEvents();
  }

  public goMisTickets(){
    this.menuAbierto = false;
    alert("MIS TICKETS")
  }

  public logout() {
    this.menuAbierto = false;
    this.store.dispatch(DataActions.clearSessionData()); // Si tenés una acción para limpiar la sesión
    localStorage.removeItem('session_data_key'); // Asegurate de borrar tu clave real
    this.appNavigation.goHomeScreen();
  }
  
  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  goToRegister() {
    this.menuAbierto = false;
    this.appNavigation.goRegisterScreen()
  }

  goHome() {
    this.menuAbierto = false;
    this.appNavigation.goHomeScreen()
  }

  goCreateEvent() {
    this.menuAbierto = false;
    this.appNavigation.goCreateEventScreen()
  }

  goEventsList() {
    this.menuAbierto = false;
    this.appNavigation.goEventsListScreen()
  }

  goLogin() {
    this.menuAbierto = false;
    this.appNavigation.goLoginScreen()
  }

}
