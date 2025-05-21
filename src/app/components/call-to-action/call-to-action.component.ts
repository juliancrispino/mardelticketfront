import { Component } from '@angular/core';
import { AppNavigationLogic } from '../../logic/navigationLogic';

@Component({
  selector: 'app-call-to-action',
  standalone: true,
  imports: [],
  templateUrl: './call-to-action.component.html',
  styleUrl: './call-to-action.component.css'
})
export class CallToActionComponent {

  constructor(
        private appNavigation: AppNavigationLogic,
  ){}


    goCreateEvent() {
    this.appNavigation.goCreateEventScreen()
  }
}
