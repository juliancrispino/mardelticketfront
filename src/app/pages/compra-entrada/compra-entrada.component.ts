import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { EventoDTO } from '../../dto/EventoDTO';
import { Store } from '@ngrx/store';
import { AppSelectors } from '../../redux/selectors';
import { FormsModule } from '@angular/forms';
import { AppNavigationLogic } from '../../logic/navigationLogic';
import { CompraRequestDTO } from '../../dto/CompraRequestDTO';
import { ServiceLogic } from '../../logic/serviceLogic';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-compra-entrada',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './compra-entrada.component.html',
  styleUrl: './compra-entrada.component.css'
})
export class CompraEntradaComponent implements OnInit {
  evento: EventoDTO | undefined;
  cantidades: { [ticketId: string]: number } = {};
  total: number = 0;
  showError: boolean = false;
  userId: string = "";

  constructor(
    private store: Store,
    private router: Router,
    private appNavigation:AppNavigationLogic,
    private serviceLogic:ServiceLogic,
  ) {}

  ngOnInit(): void {
    this.store.select(AppSelectors.selectEvento).subscribe((evento) => {
      if (evento) {
        this.evento = evento;
        this.total = 0;
        this.cantidades = {};
      }
    });
    this.store.select(AppSelectors.selectSessionData).subscribe((session) => {
      if (session) {
        this.userId = session.userIdentification;
      }
    });
  }

actualizarCantidad(ticketName: string, precio: number, cantidad: number) {
  this.cantidades[ticketName] = cantidad;
  this.validarCantidades();  // Nueva función
  this.calcularTotal();
}

validarCantidades() {
  this.showError = false;
  if (!this.evento) return;

  for (let t of this.evento.ticketTypes) {
    const cantidad = this.cantidades[t.name] || 0;
    if (cantidad > t.stock) {
      this.showError = true;
      break;
    }
  }
}

  calcularTotal() {
    this.total = 0;
    if (!this.evento) return;

    for (let t of this.evento.ticketTypes) {
      const cantidad = this.cantidades[t.name] || 0;
      this.total += t.price * cantidad;
    }
  }

  async procederAlPago() {
    if (!this.evento) return;

    const fechaCompra = new Date().toISOString(); // Formato ISO
    const usuarioId = this.userId;

    const items = this.evento.ticketTypes
      .filter(tt => this.cantidades[tt.name] > 0)
      .map(tt => ({
        ticketTypeId: tt.id,
        cantidad: this.cantidades[tt.name],
        precioUnitario: tt.price,
      }));

    const compra: CompraRequestDTO = {
      eventoId: this.evento.id,
      usuarioId: usuarioId,
      fechaCompra,
      total: this.total,
      items,
    };


    // Llamada al servicio que haga el POST
    let response = await this.serviceLogic.nuevaCompra(compra);
    if(response.success){
      Swal.fire({
        text: 'Compra generada con éxito',
        icon: 'success',
        confirmButtonText: 'Listo',
        confirmButtonColor: '#0F1635',
      });
      this.appNavigation.goHomeScreen();
    }
  }

  volver() {
    this.appNavigation.goHomeScreen();
  }
}