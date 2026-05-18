import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/producto.service';
import { CategoriaService } from '../../services/categoria.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './producto-form.component.html'
})
export class ProductoFormComponent implements OnInit {

  id: string = '';
  categorias: any[] = [];
  producto = {
    nombre: '',
    precio: null as number | null,
    stock: null as number | null,
    categoria: ''
  };

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.categoriaService.getCategorias().subscribe((res: any) => {
      this.categorias = res.data;
    });

    this.route.params.subscribe(params => {
      if(params['id']) {
        this.id = params['id'];
        this.productoService.getProducto(this.id)
          .subscribe((res: any) => {
            this.producto = {
              ...res.data,
              categoria: res.data.categoria?._id || ''
            };
            this.cd.detectChanges();
          });
      }
    });
  }

  guardar(): void {
    if(this.id) {
      this.productoService.actualizar(this.id, this.producto)
        .subscribe(() => {
          alert('Producto actualizado');
          this.router.navigate(['/productos']);
        });
    } else {
      this.productoService.crear(this.producto)
        .subscribe(() => {
          alert('Producto registrado');
          this.router.navigate(['/productos']);
        });
    }
  }

}