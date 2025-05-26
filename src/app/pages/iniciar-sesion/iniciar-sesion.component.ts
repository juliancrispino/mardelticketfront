import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceLogic } from '../../logic/serviceLogic';

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
  loginSpinner: boolean = false;


  constructor(private fb: FormBuilder,
              private serviceLogic: ServiceLogic
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z]).{8,}$/)]]
    });
  }


  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      console.log('Login data:', formData);
      this.login();
    }
  }

    public async login() {
    console.log(this.loginForm.value.email!);
    console.log(this.loginForm.value.password!);
    this.loginSpinner = true
    if (this.loginForm.valid) {
      let logginSucces = (await this.serviceLogic.buttonLogin(this.loginForm.value.email!, this.loginForm.value.password!)).valueOf();
      if (!logginSucces) {
        this.loginSpinner = false
      }
    }
  }
  

  onForgotPassword() {
    console.log("A RECUPERAR PASS")
  }

  onLoginWithGoogle() {
    console.log("LOGIN CON GOOGLE");
    
  }

}