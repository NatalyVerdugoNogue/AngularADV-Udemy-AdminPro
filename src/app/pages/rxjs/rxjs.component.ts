// ==============================================================
//       Estudio de Observable
// ==============================================================
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    // ==============================================================
    // Observable de muestra
    // ==============================================================

    // const obs = new Observable(observer => {

    //   let contador = 0;

    //   const intervalo = setInterval(() => {

    //     contador += 1;

    //     observer.next(contador);

    //     if (contador === 3) {
    //       clearInterval(intervalo);
    //       observer.complete();
    //     }

    //     if (contador === 2) {
    //       // clearInterval(intervalo);
    //       observer.error('Auxilio!');
    //     }


    //   }, 1000);

    // });

    // obs.pipe(
    //   retry(2)
    // )
    //   .subscribe(numero => console.log('Subs', numero),
    //     error => console.log('Error en el obs', error),
    //     () => console.log('El observador termino!'));

    // ==============================================================
    // Función regresa observable en constructor
    // ==============================================================
    this.subscription = this.regresaObservable()
      .subscribe(numero => console.log('Subs', numero),
        error => console.log('Error en el obs', error),
        () => console.log('El observador termino!'));

  }


  ngOnInit() {
  }

  // ==============================================================
  //       Dejar de escuchar observable
  // ==============================================================
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // ==============================================================
  //       Función Observable
  // ==============================================================
  regresaObservable(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {

      let contador = 0;

      const intervalo = setInterval(() => {

        contador += 1;

        const salida = { valor: contador };

        observer.next(salida);
        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

        // if (contador === 2) {
        //   // clearInterval(intervalo);
        //   observer.error('Auxilio!');
        // }
      }, 1000);
    }).pipe(
      map(resp => resp.valor),
      filter((valor, index) => {
        // console.log('Filter', valor, index);
        if ((valor % 2) === 1) {
          // impar
          return true;
        } else {
          // par
          return false;
        }
      })
    );
  }

}
