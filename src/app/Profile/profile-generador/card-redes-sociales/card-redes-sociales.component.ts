import { Component } from '@angular/core';
import { HeaderComponent } from "../../../Home/homepage/header/header.component";
import { NavGeneradorComponent } from '../../../Share/nav-generador/nav-generador.component';
import { ApiService } from '../../../service/api.service';

@Component({
  selector: 'app-card-redes-sociales',
  standalone: true,
  imports: [HeaderComponent, NavGeneradorComponent],
  templateUrl: './card-redes-sociales.component.html',
  styleUrl: './card-redes-sociales.component.css'
})
export class CardRedesSocialesComponent {
  navOptions: string[] = ['Mi perfil', 'Mis redes sociales', 'Mis preferencias', 'Mis propuestas', 'Configuracion'];
  
  constructor(private apiService:ApiService){

  }


  public getUrlInstagram(){
    let urlInstagram='';
    this.apiService.getUrlInstagram().subscribe(
      response => {
        console.log('Correo enviado exitosamente:', response);
        urlInstagram=response.url;
      },
      error => {
        console.error('Error al enviar el correo:', error);
      }
    )
  }  
}
