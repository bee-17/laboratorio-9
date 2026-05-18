import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private API = 'http://localhost:3000/api/productos';

  constructor(private http: HttpClient) {}

  getProductos() {
    return this.http.get<any>(this.API);
  }

  getProducto(id: string) {
    return this.http.get<any>(`${this.API}/${id}`);
  }

  crear(producto: any) {
    return this.http.post(this.API, producto);
  }

  actualizar(id: string, producto: any) {
    return this.http.put(`${this.API}/${id}`, producto);
  }

  eliminar(id: string) {
    return this.http.delete(`${this.API}/${id}`);
  }

}