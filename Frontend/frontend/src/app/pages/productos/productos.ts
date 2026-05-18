import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './productos.component.html'
})
export class Productos implements OnInit {

  productos: any[] = [];

  constructor(
    private productoService: ProductoService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.productoService.getProductos().subscribe({
      next: (res: any) => {
        this.productos = [...res.data];
        this.cd.detectChanges();
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  eliminar(id: string): void {
    const confirmar = confirm('¿Desea eliminar este producto?');
    if(confirmar) {
      this.productoService.eliminar(id).subscribe({
        next: () => {
          this.productos = this.productos.filter(p => p._id !== id);
          this.cd.detectChanges();
        },
        error: (err: any) => {
          console.error(err);
        }
      });
    }
  }

}