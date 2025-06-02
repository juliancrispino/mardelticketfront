import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppNavigationLogic } from '../../logic/navigationLogic';
import { ServiceLogic } from '../../logic/serviceLogic';
import { Store } from '@ngrx/store';
import { AppSelectors } from '../../redux/selectors';
import { EventoDTO } from '../../dto/EventoDTO';

@Component({
  selector: 'app-detalle-evento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [DatePipe],
  templateUrl: './detalle-evento.component.html',
  styleUrl: './detalle-evento.component.css'
})
export class DetalleEventoComponent implements OnInit{


public eventoDTO: EventoDTO | undefined;
public fechaFormateada: string = ''; // ej. “01/06/2025 20:30”


constructor(private appNavigation:AppNavigationLogic,
            private serviceLogic:ServiceLogic,
            private store: Store,
            private datePipe: DatePipe
) {
  
      this.store.select(AppSelectors.selectEvento)
        .subscribe(evento => {
          if(evento){
            this.eventoDTO = evento;
          }
          console.log("Evento seleccionado: ", this.eventoDTO)
      })
    }

  ngOnInit(): void {
    this.fechaFormateada = this.datePipe.transform(
    this.eventoDTO?.date,
      'dd/MM/yyyy HH:mm'
    ) as string;
  }

    comprarEntradas() {
    // Por ahora solo redirigimos a un placeholder o logueamos.
    // En una implementación real podrías abrir un modal o llevar
    // al usuario a un checkout/funnel de pago.
    alert(`Comprar entradas para "${this.eventoDTO?.title}"`);
  }
}
