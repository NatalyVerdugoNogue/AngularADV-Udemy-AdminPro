import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/model/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(public http: HttpClient, public router: Router) {
    this.cargarStorage();
  }

  // ==============================================================
  //       Determina si esta logueado para activar el Guard
  // ==============================================================
  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  // ==============================================================
  //       Obtener token y usuario del localStorage
  // ==============================================================
  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  // ==============================================================
  //       Guardar info a localstorage
  // ==============================================================
  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  // ==============================================================
  //       Desconectar
  // ==============================================================
  logOut() {
    this.token = '';
    this.usuario = null;

    // Quitar de local
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  // ==============================================================
  //       Login con Google
  // ==============================================================
  loginGoogle(token: string) {
    const url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, { token })
      .pipe(map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      }));
  }


  // ==============================================================
  //       Login con email y pass
  // ==============================================================
  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario)
      .pipe(map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      }));
  }

  // ==============================================================
  //       Crear usuario nuevo (register)
  // ==============================================================
  crearUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario)
      .pipe(map((resp: any) => {
        Swal.fire({
          type: 'success',
          title: 'Usuario creado',
          text: usuario.email
        });
        return resp.usuario;
      }));
  }

}
