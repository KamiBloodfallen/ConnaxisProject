import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PruebaService {

  private baseUrl = 'localhost:8000/consulta';

  constructor(private http: HttpClient) { }

  obtenerDatos (): Observable<any> {
    /*
    const url ='${this.baseUrl}/consulta';
    */
    return this.http.get(this.baseUrl);
  }
}
