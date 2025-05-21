import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css'
})
export class IniciarSesionComponent {
  
  loginForm: FormGroup;
  hidePassword = true;


  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z]).{8,}$/)]]
    });
  }


  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      console.log('Login data:', formData);
      

    }
  }

  onForgotPassword() {
    console.log("A RECUPERAR PASS")
  }

  onLoginWithGoogle() {
    console.log("LOGIN CON GOOGLE");
    
  }
}