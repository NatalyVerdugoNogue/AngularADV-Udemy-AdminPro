import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../model/usuario.model';
import { environment } from '../../environments/environment';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame = false;

  auth2: any;

  constructor(public router: Router, public _usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.gogleInit();

    // escribir en formulario datos de localStrorage
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  // ==============================================================
  //       Inicio con Google
  // ==============================================================
  gogleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: environment.client_id,
        cookiepolice: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSigin(document.getElementById('btnGoogle'));
    });
  }

  attachSigin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;

      this._usuarioService.loginGoogle(token)
        .subscribe(() => window.location.href = '#/dashboard');
    });
  }

  // ==============================================================
  //       Inicio con email y pass
  // ==============================================================
  ingresar(forma: NgForm) {

    if (forma.invalid) {
      return;
    }

    const usuario = new Usuario(null, forma.value.email, forma.value.password);
    this._usuarioService.login(usuario, forma.value.recuerdame)
      .subscribe(() => this.router.navigate(['/dashboard']));
  }

}
