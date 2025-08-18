import { Component } from '@angular/core';
import { HeroComponent } from "../../components/hero/hero.component";
import { FeaturesComponent } from "../../components/features/features.component";
import { CallToActionComponent } from "../../components/call-to-action/call-to-action.component";
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { ServiceLogic } from '../../logic/serviceLogic';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, FeaturesComponent, CallToActionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private serviceLogic: ServiceLogic){}

  ngOnInit(){
    this.serviceLogic.oninitDeApp();
  }

}
