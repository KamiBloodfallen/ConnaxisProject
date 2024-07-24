import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../../Home/homepage/header/header.component";
import { NavGeneradorComponent } from '../../../Share/nav-generador/nav-generador.component';
import { ApiService } from '../../../Services/UserService/api.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../../../Models/usuario.model';
import { Observable } from 'rxjs';
import { Token } from '@angular/compiler';
import { CommonModule } from '@angular/common';
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
export class CardRedesSocialesComponent implements OnInit{
  navOptions: string[] = ['Mi perfil', 'Mis redes sociales', 'Mis preferencias', 'Mis propuestas', 'Configuracion'];
  linkYoutube: string = '';
  banderaYoutube:boolean = false;
  banderaInstagram:boolean= false;
  banderaTiktok:boolean= false;
  cards: CardRed[] = [];
  usuario: Usuario | null = null;
  
  constructor(private apiService:ApiService, private router:Router, private activatedRoute: ActivatedRoute,private useService: UserService){

  }
  ngOnInit(): void {
    //Obtiene el link de google para obtener el codigo de confirmacion
    this.apiService.getUrlYoutube().subscribe(
      response => {
        console.log('Solicitud de url enviada exitosamente:', response.authUrl);
        this.linkYoutube=response.authUrl;
      },
      error => {
        console.error('Error al solicitar la url de youtube', error);
      }
    )

//Obtiene el token una vez se ha obtenido el codigo de confirmacion
    let codeYoutube = this.activatedRoute.snapshot.params['code'];
   
    if (codeYoutube && this.banderaYoutube == true){
      this.apiService.createTokenYoutube(codeYoutube).subscribe(
        response => {
          console.log('Solicitud de url enviada exitosamente:', response.tokenYoutube);
          this.banderaYoutube= false;
          this.apiService.saveTokenYoutube(response.token);
           
        },
        error => {
          this.banderaYoutube=false;
          console.error('Error al solicitar la url de youtube', error);
        }
      )
    }

    this.usuario = this.useService.getUsuario();
    this.router.queryParams.subscribe(params => {
      const codigo ={
        code:params['code'],
        social:params['social']
      }; 
      
    });




  }
  getCodeYoutube(){  
    this.banderaYoutube= true;
    window.location.href = this.linkYoutube;
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
