import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';



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

  delete(cliente: Cliente): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Estás seguro?',
      text: `Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, elimínar',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe(response => {
          this.clientes = this.clientes.filter(cli => cli !== cliente)
          swalWithBootstrapButtons.fire(
            `Cliente ${cliente.nombre} eliminado!`,
            `Cliente ${cliente.nombre} eliminado con éxito!`,
            'success'
          )
        })
      } 
    })
  }
}
