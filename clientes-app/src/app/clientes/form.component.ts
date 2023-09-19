import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})

export class FormComponent implements OnInit {
  cliente: Cliente = new Cliente();
  titulo: string = "Crear cliente"; 

  
  constructor(private clienteService: ClienteService, private router: Router,
    private activatedRoute: ActivatedRoute) {
    
  }
  
  ngOnInit() {
    this.cargarCliente();
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => { // Cuando la URL cambia y contiene un nuevo valor para el parámetro id, esta suscripción se activará.
      let id = params['id']
      if(id) { // realiza una llamada al servicio clienteService para obtener la información del cliente con el id proporcionado.
        this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente) // Cuando la respuesta esté disponible, asigna la información del cliente a la propiedad cliente de la clase actual
                                                      
      }
    })
  }

  public create(): void {
    this.clienteService.create(this.cliente).subscribe(
      cliente => {
      this.router.navigate(['/clientes']) // redirige al listado clientes
      Swal.fire('Nuevo cliente', `Cliente ${cliente.nombre} creado con éxito!`, 'success') // crea una alerta tipo success
      }
    );
  }

  update() : void {
    this.clienteService.update(this.cliente).subscribe(cliente => {
      this.router.navigate(['/clientes']) 
      Swal.fire('Cliente Actualizado', `Cliente ${cliente.nombre} actualizado con éxito!`, 'success') 
    })
  }
}
