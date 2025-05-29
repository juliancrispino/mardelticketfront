import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppNavigationLogic } from '../../logic/navigationLogic';
import { ServiceLogic } from '../../logic/serviceLogic';
import { EventoDTO } from '../../dto/EventoDTO';
import { Store } from '@ngrx/store';
import { AppSelectors } from '../../redux/selectors';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-evento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-evento.component.html',
  styleUrl: './crear-evento.component.css'
})
export class CrearEventoComponent {
  form: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  userId: string | undefined;

  constructor(private fb: FormBuilder,
              private appNavigation:AppNavigationLogic,
              private serviceLogic:ServiceLogic,
              private store: Store,
  ) {

    this.store.select(AppSelectors.selectSessionData)
      .subscribe(sessionData => {
        this.userId = sessionData?.userIdentification;
        console.log("USER ID: ", this.userId)
      })

    this.store.select(AppSelectors.selectListaEventos)
      .subscribe(listaEventos => {
        console.log("Lista evs: ", listaEventos)
        let listaEv = listaEventos;
    })


    this.form = this.fb.group({
      imagen: [null, Validators.required],
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      ubicacion: ['', Validators.required],
      tiposEntrada: this.fb.array([
        this.crearTipoEntrada()
      ])
    });
  }

  // Método para crear un FormGroup de tipo entrada
  crearTipoEntrada(): FormGroup {
    return this.fb.group({
      nombre: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      cantidad: [0, [Validators.required, Validators.min(1)]]
    });
  }

  get tiposEntrada(): FormArray {
    return this.form.get('tiposEntrada') as FormArray;
  }

  getTipoEntradaLabel(i: number): string {
    return `Tipo de entrada #${i + 1}`;
  }

  agregarTipo(): void {
    this.tiposEntrada.push(this.crearTipoEntrada());
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.form.patchValue({ imagen: file });
      this.form.get('imagen')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  crearEvento(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // 1. Extraer valores del form
    const { titulo, descripcion, fecha, hora, ubicacion, tiposEntrada } = this.form.value;

    // 2. Construir la fecha en formato ISO
    const dateIso = `${fecha}T${hora}:00`;

    // 3. Obtener la URL o el Base64 de la imagen
    //    Aquí uso la preview como Base64, pero lo ideal es subir el archivo a un storage
    //    y usar la URL que devuelva tu endpoint de imágenes.
    const imgUrl = typeof this.imagePreview === 'string'
      ? "URL DE LA IMAGEN"
      : '';

    // 4. Montar el DTO
    const eventoDTO: EventoDTO = {
      title: titulo,
      description: descripcion,
      imageUrl: imgUrl,
      date: dateIso,
      location: ubicacion,
      organizerId: this.userId ? this.userId : "",
      // si necesitas enviar tipos de entrada:
      ticketTypes: tiposEntrada.map((t: any) => ({
        name: t.nombre,
        price: t.precio,
        stock: t.cantidad
      }))
    };

    console.log('DTO a enviar:', eventoDTO);

    // 5. Llamar al servicio
    this.serviceLogic.crearNuevoEvento(eventoDTO)
      .then(() => {
        Swal.fire({
                  text: 'Evento creado con exito',
                  icon: 'success',
                  confirmButtonText: 'Listo',
                  confirmButtonColor: '#0F1635',
                });
                this.appNavigation.goHomeScreen();
      });
  }

}

