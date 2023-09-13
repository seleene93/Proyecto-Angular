import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
  // hemos eliminado los estilos
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];

  constructor (private clienteService: ClienteService) {
  }

  ngOnInit() { // el código en ngOnInit() está obteniendo una lista de clientes desde el servicio clienteService a través de un Observable y actualizando la propiedad clientes del componente con los datos obtenidos. 
    this.clienteService.getClientes().subscribe( // serviría para cargar y mostrar datos asincrónicos en un componente
      clientes => this.clientes = clientes 
    );
  }
}
