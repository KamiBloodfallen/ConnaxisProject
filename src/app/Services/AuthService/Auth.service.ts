import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private LOGIN_URL = 'http://localhost:8000/api';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private router: Router) { }


public login(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.LOGIN_URL}/login`, data, { headers });
}

public setToken (token: string): void{
  const exp = new Date().toString();
  localStorage.setItem(this.tokenKey, token);
  localStorage.setItem('expiracion',exp);
}
private getToken(): string | null{
  return localStorage.getItem(this.tokenKey);
}

//Metodo para verificar si el usuario esta autentificado (se revisa si tiene un token y si este token tiene expiracion vigente)
//Caso 1: No tiene token :false
//Caso 2: Tiene token pero no tiene expiracion : false
//Caso 3: Tiene token y este ha expirado: flase
//Caso 4: True
isAuthenticated(): boolean {
  const ahora = new Date();
  const token = this.getToken();
  let diferenciaDias = 0;
  let antes = null;
  let diferenciaMilisegundos = 0;
  

  if(!token ){
    return false;
  }else{
  let antesText = localStorage.getItem('expiracion');
  if(antesText){
    antes = new Date (antesText);
    diferenciaMilisegundos = ahora.getTime() - antes.getTime();
    diferenciaDias =  Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24));
    if(diferenciaDias>60){
     
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem('expiracion');
      return false;
    }
    }else{
   console.log("Error en la variable de expiracion.");   
   localStorage.removeItem(this.tokenKey); 
   return false;
    }
  }
  
  return true;
}
public logout (){
  localStorage.removeItem(this.tokenKey);
  localStorage.removeItem('expiracion');
}
}