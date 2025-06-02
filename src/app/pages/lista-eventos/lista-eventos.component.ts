import { Component } from '@angular/core';
import { AppNavigationLogic } from '../../logic/navigationLogic';
import { ServiceLogic } from '../../logic/serviceLogic';
import { Store } from '@ngrx/store';
import { EventoDTO } from '../../dto/EventoDTO';
import { AppSelectors } from '../../redux/selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-eventos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-eventos.component.html',
  styleUrl: './lista-eventos.component.css'
})
export class ListaEventosComponent {

  public listaEventos: EventoDTO[] = [];

    constructor(private appNavigation:AppNavigationLogic,
                private serviceLogic:ServiceLogic,
                private store: Store,
    ) {
  
      this.store.select(AppSelectors.selectListaEventos)
        .subscribe(listaEvs => {
          if(listaEvs){
            this.listaEventos = listaEvs;
          }
          console.log("Lista eventos en componente: ", this.listaEventos)
      })
    }

  
  getMinPrice(tipos: {  name: string; price: number; stock: number }[]): number {
    return tipos.reduce((min, t) => t.price < min ? t.price : min, tipos[0]?.price ?? 0);
  }

  verDetalle(evento: EventoDTO) {
    this.appNavigation.goEventsScreen(evento)
  }


}
