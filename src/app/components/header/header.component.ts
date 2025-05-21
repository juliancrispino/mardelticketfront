import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppNavigationLogic } from '../../logic/navigationLogic';

@Component({
  selector: 'app-header',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  
  menuAbierto = false;

  constructor(
        private appNavigation: AppNavigationLogic,
  ){}
  
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

  goLogin() {
    this.menuAbierto = false;
    this.appNavigation.goLoginScreen()
  }

}
