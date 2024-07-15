import { Component, OnInit } from '@angular/core';
import { NavGeneradorComponent } from '../../Share/nav-generador/nav-generador.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { AuthService } from '../../Services/AuthService/Auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile-generador',
  standalone: true,
  imports: [NavGeneradorComponent,HeaderComponent,ContentComponent],
  templateUrl: './profile-generador.component.html',
  styleUrl: './profile-generador.component.css'
})
export class ProfileGeneradorComponent implements OnInit{
  navOptions: string[] = ['Mi perfil', 'Mis redes sociales', 'Mis preferencias', 'Mis propuestas', 'Configuracion'];

  constructor(private authService: AuthService, private router: Router) { }
   ngOnInit() {
     if (this.authService.isAuthenticated()) {
      
     }else{
      console.log("No lo revises");
       this.router.navigate(['/login']); 
     }
   }
}
