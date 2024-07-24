import { Component } from '@angular/core';
import { StepperComponent } from '../../Share/stepper/stepper.component';
import { Router } from '@angular/router';
import { UserService } from '../../Services/UserService/user.service';
import { Usuario } from '../../Models/usuario.model';
import { ApiService } from '../../Services/UserService/api.service';

@Component({
  selector: 'app-verificacion',
  standalone: true,
  imports: [StepperComponent],
  templateUrl: './verificacion.component.html',
  styleUrl: './verificacion.component.css'
})
export class VerificacionComponent {
  usuario: Usuario | null = null;

  constructor(private router: Router,private useService: UserService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.usuario = this.useService.getUsuario();
    console.log('Usuario recibido:', this.usuario);
    
    this.sendCorreo();
  }

  public sendCorreo(){
    const correo={
      CorreoElectronico:this.usuario?.CorreoElectronico,
      IdUsuario:this.usuario?.IdUsuario
    }
    console.log("Correo del usuario "+this.usuario?.CorreoElectronico+" Id del usuario:"+this.usuario?.IdUsuario);
    if (this.usuario) {
      this.apiService.sendCorreo(correo).subscribe(
        response => {
          console.log('Correo enviado exitosamente:', response);
        },
        error => {
          console.error('Error al enviar el correo:', error);
        }
      );
    }else{
      console.log("No se encuentra a ningun usuario");
    }
  }
}
