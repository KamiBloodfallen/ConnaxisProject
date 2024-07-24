import { Component } from '@angular/core';
import { HeaderComponent } from "../../../Home/homepage/header/header.component";
import { NavGeneradorComponent } from '../../../Share/nav-generador/nav-generador.component';
import { ApiService } from '../../../Services/UserService/api.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../Models/usuario.model';
import { UserService } from '../../../Services/UserService/user.service';


interface CardRed {
  logo: string;
  profilePhoto: string;
  name: string;
  email: string;
  followers: string;
}

@Component({
  selector: 'app-card-redes-sociales',
  standalone: true,
  imports: [HeaderComponent, NavGeneradorComponent,CommonModule],
  templateUrl: './card-redes-sociales.component.html',
  styleUrl: './card-redes-sociales.component.css'
})
export class CardRedesSocialesComponent {
  navOptions: string[] = ['Mi perfil', 'Mis redes sociales', 'Mis preferencias', 'Mis propuestas', 'Configuracion'];
  cards: CardRed[] = [];
  usuario: Usuario | null = null;
  constructor(private apiService:ApiService, private route:ActivatedRoute,private useService: UserService){

  }

  ngOnInit() {
    this.usuario = this.useService.getUsuario();
    this.route.queryParams.subscribe(params => {
      const codigo ={
        code:params['code'],
        social:params['social']
      }; 
      if (codigo) {
        console.log(codigo);
        if(codigo.social==1){
          const data={
            code:codigo.code,
            IdUsuario:this.usuario?.IdUsuario,
          };
        this.registroRedesInstagram(data);   
        }else{
          if(codigo.social==2){
              //metodo youtube
          }else{
              //metodo tiktok
          }
        }
        

      } else {
        console.log('No se tiene un url como parametro');
      }
    });
  }


  public getUrlInstagram(){
    let urlInstagram='';
    this.apiService.getUrlInstagram().subscribe(
      response => {
        console.log('Correo enviado exitosamente:', response);
        urlInstagram=response.urlInstagram;
        window.location.href = urlInstagram;
      },
      error => {
        console.error('Error al enviar el correo:', error);
      }
    )
  }  

  public registroRedesInstagram(code:any){
     this.apiService.registroInstagram(code).subscribe(
      response => {
        console.log('Red social vinculada exitosdmente:', response);
        const newCard: CardRed = {
          logo: 'logo-instagram.png',
          profilePhoto: response.profile_picture,
          name: response.username,
          email: 'nicol.bustamante@gmail.com',
          followers: response.followers_count
        };
        this.cards.push(newCard);
      },
      error => {
        console.error('Error al registrar la red social:', error);
      }
     )
  }
}
