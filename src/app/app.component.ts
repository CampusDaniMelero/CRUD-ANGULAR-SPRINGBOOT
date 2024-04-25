import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Producto } from './Producto';
import { ServicioProductosService } from './servicio-productos.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule,NgIf,NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  [x: string]: any;
  productos:Producto[]=[];
  nuevoProducto: Producto = {} as Producto;
  IdProductoEliminar : any; // Initialize an empty Producto object
  constructor(private servicio:ServicioProductosService){}

  ngOnInit(): void {
    this.servicio.obtenerProducto().subscribe(data => this.productos = data);
    console.log(this.productos);

    
  }

  addProducto(): void {
    this.servicio.addProducto(this.nuevoProducto).subscribe(response => {
      console.log('Producto añadido:', response);
      this.nuevoProducto = {} as Producto;
      this.servicio.obtenerProducto().subscribe(updatedProducts => this.productos = updatedProducts); // Refresh product list
    }, error => {
      console.error('Error adding product:', error);
    });
  }

  deleteProducto(): void {
    if (this.IdProductoEliminar !== undefined) {
      this.servicio.deleteProducto(this.IdProductoEliminar).subscribe(response => {
        console.log('Producto eliminado:', this.IdProductoEliminar);
        this.servicio.obtenerProducto().subscribe(updatedProducts => this.productos = updatedProducts); // Refresh product list
      }, error => {
        console.error('Error eliminando producto:', error);
      });
    } else {
      console.error('Please enter a product ID to delete.');
    }
  }
}
  
