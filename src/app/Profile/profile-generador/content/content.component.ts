import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../Services/UserService/user.service';
import { Usuario } from '../../../Models/usuario.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../Services/AuthService/Auth.service';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {
  usuario : Usuario | null = null;
  NombrePerfil : any | null = null;
  Descripcion : any | null= null;
  Contacto : any | null = null;
  Departamento : any | null = null;
  constructor(private user: UserService, private router: Router , private auth: AuthService){
  }
ngOnInit(){
 this.usuario = this.user.getUsuario();
 if(this.usuario == null){
   this.auth.logout();
   this.router.navigate(['/']); 

 }else{
  this.NombrePerfil = this.usuario.Nombre_perfil;
  this.Descripcion = this.usuario.Descripcion;
  this.Departamento = this.usuario.ResidenciaDepartamento;
  this.Contacto = this.usuario.Contacto;
 }
 
}
  
}
