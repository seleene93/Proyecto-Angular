import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json'; // contiene nuestro listado de clientes
import { Cliente } from './cliente';
import { Observable, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes' // servidor Spring
  constructor(private http: HttpClient) { } // Ppermite utilizar http para realizar solicitudes HTTP en tus métodos dentro de la clase sin tener que crear una nueva instancia de HttpClient cada vez que necesites realizar una solicitud HTTP.

  getClientes(): Observable<Cliente[]> { // crea un Observable que emite la lista de clientes una vez y luego se completa. Es útil cuando se tienen datos estáticos o predefinidos que no provienen de una fuente asincrónica
   // return of(CLIENTES); 
  /* return this.http.get(this.urlEndPoint).pipe( // es una forma de hacer lo mismo
    map( (response) => response as Cliente[])); // pipe (para realizar operaciones adicionales antes que se complete la soliticud) hemos hecho un casteo con map para transformar el resultado que devuelva un array de objetos
    */
   return this.http.get<Cliente[]>(this.urlEndPoint); // Casteo a array de objetos
  }
}
