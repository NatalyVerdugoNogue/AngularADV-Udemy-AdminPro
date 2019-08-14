import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  // Ajustes por defecto
  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default-dark.css',
    tema: 'default-dark'
  };

  constructor(@Inject(DOCUMENT) private _document) {
    this.cargarAjustes();
  }

  // ==============================================================
  //       Guardar ajustes en localStorage
  // ==============================================================
  guardarAjustes() {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  // ==============================================================
  //       Obtener ajustes de localStorage
  // ==============================================================
  cargarAjustes() {
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));

      this.aplicarTema(this.ajustes.tema);
    }
  }

  // ==============================================================
  //       Modificar ajustes de tema
  // ==============================================================
  aplicarTema(tema: string) {
    const url = `assets/css/colors/${tema}.css`;
    this._document.getElementById('tema').setAttribute('href', url);

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;

    this.guardarAjustes();
  }

}

// ==============================================================
//       Intyerface de ajustes
// ==============================================================
interface Ajustes {
  temaUrl: string;
  tema: string;
}
