import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', // la vista del componente principal
  styleUrls: ['./app.component.css'] // los estilos del componente principal
})
export class AppComponent {
  title = 'Bienvenido a Angular';

  curso: string = 'Curso Spring con Angular';
  profesor: string = 'Selene Muñoz';
}
