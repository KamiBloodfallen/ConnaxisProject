import { Injectable } from '@angular/core';
import { Usuario } from '../Models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private usuario: Usuario | null = null;

  constructor() {};

  setUsuario(usuario: Usuario) {
    this.usuario = usuario;
  }

   getUsuario(): Usuario | null {
    return this.usuario;
  }
}
