import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AppNavigationLogic } from '../../logic/navigationLogic';
import { ServiceLogic } from '../../logic/serviceLogic';
import { UserDataDTO } from '../../dto/userDataDTO';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.css'
})
export class RegistrarseComponent {

  hidePassword = true;
  hideConfirm = true;

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z]).{8,}$/)]],
    confirmPassword: ['', Validators.required],
  }, { validators: this.passwordMatchValidator });


  constructor(private fb: FormBuilder,
              private appNavigation: AppNavigationLogic,
              private serviceLogic: ServiceLogic
  ) {}

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  async register() {
    this.form.markAllAsTouched(); // para mostrar errores si se hace submit sin tocar campos
    if (this.form.valid) {
      let newUser:UserDataDTO = {
        fullName : this.form.value.name ? this.form.value.name : '',
        email : this.form.value.email ? this.form.value.email : '',
        password : this.form.value.password ? this.form.value.password : ''
      }
      let response = await (await this.serviceLogic.crearNuevoUsuario(newUser))
      console.log('Usuario registrado:', this.form.value);
      if(response.success){
        Swal.fire({
          text: 'Usuario creado con exito',
          icon: 'success',
          confirmButtonText: 'Listo',
          confirmButtonColor: '#0F1635',
        });
        this.appNavigation.goLoginScreen();
    } else{
      if(response.errorCode == "EXISTENTE"){
        Swal.fire({
        text: 'Usuario ya existente',
        icon: 'error',
        confirmButtonText: 'Listo',
        confirmButtonColor: '#0F1635',
      });
      } else {
        Swal.fire({
          text: 'Error al crear usuario',
          icon: 'error',
          confirmButtonText: 'Listo',
          confirmButtonColor: '#0F1635',
        });
      }
    }
    }
  }

  goLogin(){
    this.appNavigation.goLoginScreen();
  }
}