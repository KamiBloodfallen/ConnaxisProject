import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private LOGIN_URL = 'http://localhost:8000/login';
  private tokenKey = 'authToken';

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(user: string, password: string): Observable<any> {
  
    return this.httpClient.post<any>(this.LOGIN_URL, {user, password}).pipe(
      tap(response=>{
        if(response.token){
          console.log(response.token);
        }
      })
    )
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
  const antesText = sessionStorage.getItem('expiracion');
  let diferenciaDias = 0;

  if(!token || !antesText){
    return false;
  }

  const antes = new Date (antesText);
  const diferenciaMilisegundos = ahora.getTime() - antes.getTime();
  
  diferenciaDias =  Math.floor(diferenciaMilisegundos / 24);
  if(diferenciaDias>60){
    return false;
  }
  return true;
}
}