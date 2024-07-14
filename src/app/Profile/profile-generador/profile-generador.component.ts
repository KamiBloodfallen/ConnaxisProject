import { Component } from '@angular/core';
import { NavGeneradorComponent } from '../../Share/nav-generador/nav-generador.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';


@Component({
  selector: 'app-profile-generador',
  standalone: true,
  imports: [NavGeneradorComponent,HeaderComponent,ContentComponent],
  templateUrl: './profile-generador.component.html',
  styleUrl: './profile-generador.component.css'
})
export class ProfileGeneradorComponent {
  navOptions: string[] = ['Mi perfil', 'Mis redes sociales', 'Mis preferencias', 'Mis propuestas', 'Configuracion'];
}
