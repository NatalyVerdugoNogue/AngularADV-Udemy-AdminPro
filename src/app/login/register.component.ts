import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { UsuarioService } from '../services/service.index';
import { Usuario } from '../model/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(public _usuarioService: UsuarioService, public router: Router) { }

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false),
    }, {
        validators: this.sonIguales('password', 'password2')
      });

    // Pongo valores autorelleno
    this.forma.setValue({
      nombre: 'Test ',
      correo: 'test@test.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    });
  }

  // ==============================================================
  //       Funcion comparacion password
  // ==============================================================
  sonIguales(campo1: string, campo2: string) {

    return (group: FormGroup) => {

      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {
        return null;
      }

      return { sonIguales: true };
    };
  }

  // ==============================================================
  //       Registro de usuario
  // ==============================================================
  registrarUsuario() {
    if (this.forma.invalid) {
      return;
    }

    // Alerta sweetalert2
    if (!this.forma.value.condiciones) {
      Swal.fire({
        type: 'warning',
        title: 'Importante',
        text: 'Debe aceptar las condiciones'
      });
      return;
    }

    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );

    this._usuarioService.crearUsuario(usuario)
      .subscribe(() => this.router.navigate(['/login']));
  }

}
