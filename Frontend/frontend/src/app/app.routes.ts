import { Routes } from '@angular/router';
import { Categorias } from './pages/categorias/categorias';
import { CategoriaFormComponent } from './pages/categoria-form/categoria-form';
import { Productos } from './pages/productos/productos';
import { ProductoFormComponent } from './pages/producto-form/producto-form';

export const routes: Routes = [
  { path: '', redirectTo: '/categorias', pathMatch: 'full' },
  { path: 'categorias', component: Categorias },
  { path: 'categorias/crear', component: CategoriaFormComponent },
  { path: 'categorias/editar/:id', component: CategoriaFormComponent },
  { path: 'productos', component: Productos },
  { path: 'productos/crear', component: ProductoFormComponent },
  { path: 'productos/editar/:id', component: ProductoFormComponent }
];