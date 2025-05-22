import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppNavigationLogic } from '../../logic/navigationLogic';

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

  constructor(private fb: FormBuilder,
              private appNavigation:AppNavigationLogic
  ) {
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

    console.log('Formulario válido', this.form.value);
    // Aquí podrías enviar el formulario al backend

    this.goSuccesNotification();
  }

  goSuccesNotification(){
    this.appNavigation.goSuccesNotification();
  }
}
