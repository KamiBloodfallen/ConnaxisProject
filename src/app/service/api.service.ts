import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioRegister } from '../Models/usuarioRegister.model';
import { Usuario } from '../Models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000/api';
  private webUrl = 'http://localhost:8000';


  constructor(private http: HttpClient) {}

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
    let params = new HttpParams().set('CorreoElectronico', data.CorreoElectronico);

    return this.http.get<any>(`${this.webUrl}/sendCorreo`,{ headers, params });
  }
  
  public getUrlInstagram(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/instagram`);
  }
}
