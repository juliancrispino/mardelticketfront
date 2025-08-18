import { Component, OnInit } from '@angular/core';
import { EventoDTO } from '../../dto/EventoDTO';
import { AppNavigationLogic } from '../../logic/navigationLogic';
import { Store } from '@ngrx/store';
import { AppSelectors } from '../../redux/selectors';
import { CommonModule } from '@angular/common';
import { ServiceLogic } from '../../logic/serviceLogic';

@Component({
  selector: 'app-mis-eventos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-eventos.component.html',
  styleUrl: './mis-eventos.component.css'
})
export class MisEventosComponent implements OnInit{

  listaEventos: EventoDTO[] = [];
  listaEventosSinFiltrar: EventoDTO[] | undefined;
  userIdentification: any;

  constructor(private appNavigation: AppNavigationLogic,
              private store: Store,
              private serviceLogic: ServiceLogic){
                // REDUX
    this.store.select(AppSelectors.selectSessionData)
      .subscribe(value => {
        this.userIdentification = value?.userIdentification;
        this.serviceLogic.obtenerEventosDeUsuario(this.userIdentification)
          .then(eventos => {
              this.listaEventos = eventos;   // ✅ seteás la variable
              console.log("Eventos seteados en listaEventos:", this.listaEventos);
            });
      })

  }

  ngOnInit(): void {

  }

  editarEvento(evento: EventoDTO){
    console.log("EVENTO: ", evento)
  }
}
