import { Component } from '@angular/core';
import { AppNavigationLogic } from '../../logic/navigationLogic';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {

  constructor(
    private appNavigation: AppNavigationLogic
  ){}



  goCreateEvent() {
    this.appNavigation.goCreateEventScreen()
  }

}
