import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { UsuarioRegister } from '../../Models/usuarioRegister.model';
import { Usuario } from '../../Models/usuario.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000/api';
  private webUrl = 'http://localhost:8000';


  constructor(private http: HttpClient, private userService: UserService) {}

  public registro2(data:any){
    return this.http.post(this.apiUrl+'/registro',data);
  }

  public getGenerador(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/estudiante`);
  }

  public registrar(data: UsuarioRegister): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/registro`, data, { headers });
  }
  public actuDescripcionGenerador(data: any,id:number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(`${this.apiUrl}/generador/${id}/descripcion`, data, { headers });
  }

  public actuNombrePerfil(data:any,id:number): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(`${this.apiUrl}/generador/${id}/nombre-perfil`, data, { headers });
  }
  
  public registrarInteres(data:any): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/generador/intereses`, data, { headers });
  }

  public sendCorreo(data:any): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let params = new HttpParams().set('CorreoElectronico', data.CorreoElectronico).set('IdUsuario', data.IdUsuario);;

    return this.http.get<any>(`${this.webUrl}/sendCorreo`,{ headers, params });
  }
  
  public getUrlInstagram(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/instagram`);
  }

  public registroInstagram(data:any): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/instagramToken`, data, { headers });
  }

  public getUrlYoutube(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/youtube`);
  }

  
public createTokenYoutube(codeYoutube: String): Observable<any> {


  if (!codeYoutube) {
    return throwError(() => new Error('El codigo de confirmación de youtube no existe'));
  }

  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  return this.http.post<any>(`${this.apiUrl}/youtube-createTokenYoutube`, codeYoutube, { headers })
}

 
  public saveTokenYoutube (tokenYoutube: String): Observable<any>
  {
    
    if (!tokenYoutube){
      return throwError(() => new Error('El token de youtube no existe'));
    }
    const usuario= this.userService.getUsuario();

    if (!usuario){
      return throwError(() => new Error('El modelo del usuario no existe'));
    }
    
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const data = {
      IdUsuario: usuario.IdUsuario,
      tokenYoutube: tokenYoutube
      };

    return this.http.post<any>(`${this.apiUrl}/youtube-saveTokenYoutube`,data,{headers});
  }

  public cardData (codigo: String): Observable<any>
  {
    if (!codigo){
      return throwError(() => new Error('El codigo de la cuenta no existe'));
    }
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const data = {
      IdCuenta: codigo,
      };
    return this.http.post<any>(`${this.apiUrl}/youtube-cardData`,data,{headers});

  }

  // public cardData2 (codigo: String): Observable<any>
  // {
  //   if (!codigo){
  //     return throwError(() => new Error('El codigo de la cuenta no existe'));
  //   }
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   const data = {
  //     IdCuenta: codigo,
  //     };
  //   return this.http.post<any>(`${this.apiUrl}/youtube-cardData2`,data,{headers});
  // }
  // public setIdAccount (token:string): Observable <any>{
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   const usuario= this.userService.getUsuario();
  //   if (!usuario){
  //     return throwError(() => new Error('El modelo del usuario no existe'));
  //   }
  //   const data = {
  //     IdUsuario: usuario.IdUsuario,
  //     Token: token
  //     };
  //   return this.http.post<any>(`${this.apiUrl}/youtube-setIdAccount`,data,{headers});
  // }

}
