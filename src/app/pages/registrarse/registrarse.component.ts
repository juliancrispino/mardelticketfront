import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AppNavigationLogic } from '../../logic/navigationLogic';

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
              private appNavigation: AppNavigationLogic
  ) {}

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  register() {
    this.form.markAllAsTouched(); // para mostrar errores si se hace submit sin tocar campos
    if (this.form.valid) {
      console.log('Usuario registrado:', this.form.value);
    }
  }

  goLogin(){
    this.appNavigation.goLoginScreen();
  }
}