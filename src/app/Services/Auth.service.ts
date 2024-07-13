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

  // login(data:any): Observable<any> {
  
  //   return this.httpClient.post<any>(this.LOGIN_URL, data).pipe(
  //     tap(response=>{
  //       if(response.token){
  //         console.log(response.token);
  //       }
  //     })
  //   )
  // }

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
isAuthenticated(): boolean {
  const ahora = new Date();
  const token = this.getToken();
  let diferenciaDias = 0;
  let antes = null;
  let diferenciaMilisegundos = 0;
  

  if(!token ){
    console.log('entre por aca boludo 2.0');
    return false;
  }else{
  let antesText = localStorage.getItem('expiracion');
  if(antesText){
    antes = new Date (antesText);
    diferenciaMilisegundos = ahora.getTime() - antes.getTime();
    diferenciaDias =  Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24));
    if(diferenciaDias>60){
      console.log('entre por aca boludo 3.0');
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem('expiracion');
      return false;
    }
    }else{
   console.log("Error en la variable de expiracion en el localstorage");    
    }
  }
  
  console.log('entre por aca boludo 4.0');
  return true;
}
public logout (){
  localStorage.removeItem(this.tokenKey);
  localStorage.removeItem('expiracion');
}
}