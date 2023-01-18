import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { routes } from './routes';

/**
 * EN: Módule to manage the routes of the application.
 * 
 * ES: Módulo para gestionar las rutas de la aplicación.
 */
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
