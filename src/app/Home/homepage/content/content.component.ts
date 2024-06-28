import { Component } from '@angular/core';
import { BtLoginComponent } from '../../../Share/bt-login/bt-login.component';
import { EntradaTextoComponent } from '../../../Share/entrada-texto/entrada-texto.component';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [BtLoginComponent, EntradaTextoComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {

}
