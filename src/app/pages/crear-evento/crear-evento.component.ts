import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppNavigationLogic } from '../../logic/navigationLogic';
import { ServiceLogic } from '../../logic/serviceLogic';
import { EventoDTO } from '../../dto/EventoDTO';
import { Store } from '@ngrx/store';
import { AppSelectors } from '../../redux/selectors';
import Swal from 'sweetalert2';
// import { ImgurService } from '../../logic/imgur.service';
import { CloudinaryService } from '../../logic/cloudinary.service';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';


@Component({
  selector: 'app-crear-evento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ImageCropperComponent],
  templateUrl: './crear-evento.component.html',
  styleUrl: './crear-evento.component.css'
})
export class CrearEventoComponent {
  form: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  userId: string | undefined;
  selectedFile!: File;
  imageChangedEvent: any = '';
  croppedImage: string | null = null;

  constructor(private fb: FormBuilder,
              private appNavigation:AppNavigationLogic,
              private serviceLogic:ServiceLogic,
              private store: Store,
              private cloudinarySvc: CloudinaryService,
              // private imgurSvc: ImgurService,
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

  // onFileSelected(event: Event): void {
  //   const file = (event.target as HTMLInputElement)?.files?.[0];
  //   if (file) {
  //     this.form.patchValue({ imagen: file });
  //     this.form.get('imagen')?.updateValueAndValidity();

  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.imagePreview = reader.result;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
      this.form.patchValue({ imagen: file });
      this.form.get('imagen')?.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => this.imagePreview = reader.result;
      reader.readAsDataURL(file);
    }
  }

   // 1) Cuando el usuario selecciona un archivo original:
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  // 2) Cuando el cropper emite un recorte:
  imageCropped(event: ImageCroppedEvent): void {
    // 2.1) Guardamos la base64 para la vista previa:
    this.croppedImage = event.base64 ?? null;

    // 2.2) Si existe 'event.blob', convertimos ese blob en File:
    if (event.blob) {
      const blob = event.blob;
      // El nombre “cropped-image.png” es arbitrario, puedes cambiarlo:
      this.selectedFile = new File([blob], 'cropped-image.png', { type: blob.type });
      // Actualizamos el FormControl 'imagen' con el File recortado:
      this.form.patchValue({ imagen: this.selectedFile });
      this.form.get('imagen')?.updateValueAndValidity();
    }
  }

  imageLoaded(): void {
    // Opcional: aquí podrías ocultar un spinner y mostrar el cropper
  }

  cropperReady(): void {
    // El cropper está listo para usarse
  }

  loadImageFailed(): void {
    Swal.fire('Error', 'No se pudo cargar la imagen. Intenta con otra.', 'error');
  }

  base64ToFile(dataUrl: string, filename: string): File {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime || 'image/png' });
  }

  async crearEvento(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Extraer datos del form
    const { titulo, descripcion, fecha, hora, ubicacion, tiposEntrada } = this.form.value;
    const dateIso = `${fecha}T${hora}:00`;

    // 1) Subir a Cloudinary
    let imageUrl: string;
    try {
      imageUrl = await this.cloudinarySvc.uploadImage(this.selectedFile);
      console.log("img: ",imageUrl)
    } catch (err) {
      console.error('Error subiendo a Cloudinary:', err);
      Swal.fire({
        text: 'No se pudo subir la imagen. Intenta más tarde.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    // 2) Montar DTO con la URL devuelta
    const eventoDTO: EventoDTO = {
      title: titulo,
      description: descripcion,
      imageUrl,
      date: dateIso,
      location: ubicacion,
      organizerId: this.userId ?? '',
      ticketTypes: tiposEntrada.map((t: any) => ({
        name: t.nombre,
        price: t.precio,
        stock: t.cantidad
      })),
      id: 0
    };

    // 3) Enviar al backend
    await this.serviceLogic.crearNuevoEvento(eventoDTO);
    Swal.fire({
      text: 'Evento creado con éxito',
      icon: 'success',
      confirmButtonText: 'Listo',
      confirmButtonColor: '#0F1635',
    });
    this.appNavigation.goHomeScreen();
  }


  // crearEvento(): void {
  //   if (this.form.invalid) {
  //     this.form.markAllAsTouched();
  //     return;
  //   }

  //   // 1. Extraer valores del form
  //   const { titulo, descripcion, fecha, hora, ubicacion, tiposEntrada } = this.form.value;

  //   // 2. Construir la fecha en formato ISO
  //   const dateIso = `${fecha}T${hora}:00`;

  //   // 3. Obtener la URL o el Base64 de la imagen
  //   //    Aquí uso la preview como Base64, pero lo ideal es subir el archivo a un storage
  //   //    y usar la URL que devuelva tu endpoint de imágenes.
  //   const imgUrl = typeof this.imagePreview === 'string'
  //     ? "URL DE LA IMAGEN"
  //     : '';

  //   // 4. Montar el DTO
  //   const eventoDTO: EventoDTO = {
  //     title: titulo,
  //     description: descripcion,
  //     imageUrl: imgUrl,
  //     date: dateIso,
  //     location: ubicacion,
  //     organizerId: this.userId ? this.userId : "",
  //     // si necesitas enviar tipos de entrada:
  //     ticketTypes: tiposEntrada.map((t: any) => ({
  //       name: t.nombre,
  //       price: t.precio,
  //       stock: t.cantidad
  //     }))
  //   };

  //   console.log('DTO a enviar:', eventoDTO);

  //   // 5. Llamar al servicio
  //   this.serviceLogic.crearNuevoEvento(eventoDTO)
  //     .then(() => {
  //       Swal.fire({
  //                 text: 'Evento creado con exito',
  //                 icon: 'success',
  //                 confirmButtonText: 'Listo',
  //                 confirmButtonColor: '#0F1635',
  //               });
  //               this.appNavigation.goHomeScreen();
  //     });
  // }

}

