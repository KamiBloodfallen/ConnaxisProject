import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-entrada-texto',
  standalone: true,
  imports: [],
  templateUrl: './entrada-texto.component.html',
  styleUrl: './entrada-texto.component.css'
})
export class EntradaTextoComponent {
@Input() placeHolder = "";
}
