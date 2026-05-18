import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categorias.component.html'
})
export class Categorias implements OnInit {

  categorias: any[] = [];

  constructor(
    private categoriaService: CategoriaService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.categoriaService.getCategorias().subscribe({
      next: (res: any) => {
        this.categorias = [...res.data];
        this.cd.detectChanges();
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  eliminar(id: string): void {
    const confirmar = confirm('¿Desea eliminar esta categoría?');
    if(confirmar) {
      this.categoriaService.eliminar(id).subscribe({
        next: () => {
          this.categorias = this.categorias.filter(c => c._id !== id);
          this.cd.detectChanges();
        },
        error: (err: any) => {
          console.error(err);
        }
      });
    }
  }

}