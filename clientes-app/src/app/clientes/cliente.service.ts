import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json'; // contiene nuestro listado de clientes
import { Cliente } from './cliente';
import { Observable, map, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes' // servidor Spring
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { } // Ppermite utilizar http para realizar solicitudes HTTP en tus métodos dentro de la clase sin tener que crear una nueva instancia de HttpClient cada vez que necesites realizar una solicitud HTTP.

  getClientes(): Observable<Cliente[]> { // crea un Observable que emite la lista de clientes una vez y luego se completa. Es útil cuando se tienen datos estáticos o predefinidos que no provienen de una fuente asincrónica
   // return of(CLIENTES); 
  /* return this.http.get(this.urlEndPoint).pipe( // es una forma de hacer lo mismo
    map( (response) => response as Cliente[])); // pipe (para realizar operaciones adicionales antes que se complete la soliticud) hemos hecho un casteo con map para transformar el resultado que devuelva un array de objetos
    */
   return this.http.get<Cliente[]>(this.urlEndPoint); // Casteo a array de objetos
  }

  create(cliente: Cliente) : Observable<Cliente> {
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeaders}); // implementamos el método create
  }

    getCliente(id): Observable<Cliente> {
      return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`)
    }

    update(cliente: Cliente): Observable<Cliente> { // Envia una solicitud HTTP PUT para actualizar un cliente específico en función del objeto cliente proporcionado como argumento. 
      // Cuando se completa la solicitud, el método devuelve un Observable que permite manejar la respuesta de manera asíncrona 
      return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders})
    }

    delete(id: number): Observable<Cliente>{
     return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders})
    }
}
