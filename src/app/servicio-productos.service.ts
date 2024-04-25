import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError , of } from 'rxjs';
import { Producto } from './Producto';

@Injectable({
  providedIn: 'root'
})
export class ServicioProductosService {
  private url: string='http://localhost:8081/producto';

  constructor(private http:HttpClient) { }

obtenerProducto():Observable<Producto[]>{
  console.log(this.url);
  return this.http.get<Producto[]>(this.url);


}

addProducto(producto: Producto): Observable<Producto> {
  return this.http.post<Producto>(this.url, producto);
}
deleteProducto(product_id: number): Observable<void> {
  return this.http.delete<void>(`${this.url}/${product_id}`);
}
}
