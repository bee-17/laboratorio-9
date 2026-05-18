import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriaService } from '../../services/categoria.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './categoria-form.component.html'
})
export class CategoriaFormComponent implements OnInit {

  id: string = '';
  categoria = {
    nombre: '',
    descripcion: ''
  };

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params['id']) {
        this.id = params['id'];
        this.categoriaService.getCategoria(this.id)
          .subscribe((res: any) => {
            this.categoria = { ...res.data };
            this.cd.detectChanges();
          });
      }
    });
  }

  guardar(): void {
    if(this.id) {
      this.categoriaService.actualizar(this.id, this.categoria)
        .subscribe(() => {
          alert('Categoría actualizada');
          this.router.navigate(['/categorias']);
        });
    } else {
      this.categoriaService.crear(this.categoria)
        .subscribe(() => {
          alert('Categoría registrada');
          this.router.navigate(['/categorias']);
        });
    }
  }

}