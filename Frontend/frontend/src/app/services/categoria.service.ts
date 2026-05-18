import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private API = 'http://localhost:3000/api/categorias';

  constructor(private http: HttpClient) {}

  getCategorias() {
    return this.http.get<any>(this.API);
  }

  getCategoria(id: string) {
    return this.http.get<any>(`${this.API}/${id}`);
  }

  crear(categoria: any) {
    return this.http.post(this.API, categoria);
  }

  actualizar(id: string, categoria: any) {
    return this.http.put(`${this.API}/${id}`, categoria);
  }

  eliminar(id: string) {
    return this.http.delete(`${this.API}/${id}`);
  }

}