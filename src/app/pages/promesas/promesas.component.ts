// ==============================================================
//       Estudio de promesas
// ==============================================================
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    // ==============================================================
    // Promesa desde constructor sucio
    // ==============================================================

    // const promesa = new Promise((resolve, reject) => {

    //   let contador = 0;

    //   const intervalo = setInterval(() => {

    //     contador += 1;
    //     console.log('contador', contador);


    //     if (contador === 3) {
    //       resolve();
    //       clearInterval(intervalo);
    //     }

    //   }, 1000);
    // });


    // promesa.then(() =>
    //   console.log('termino'))
    //   .catch(error => console.error('Error en promesa', error)
    //   );

    // ==============================================================
    // Promesa desde función en constructor
    // ==============================================================
    this.contarTres().then(() =>
      console.log('termino'))
      .catch(error => console.error('Error en promesa', error)
      );

  }

  ngOnInit() {
  }

  // ==============================================================
  //       Función promesa
  // ==============================================================
  contarTres(): Promise<boolean> {
    return new Promise((resolve, reject) => {

      let contador = 0;

      const intervalo = setInterval(() => {

        contador += 1;
        console.log('contador', contador);

        if (contador === 3) {
          resolve(true);
          clearInterval(intervalo);
        }

      }, 1000);
    });
  }

}


