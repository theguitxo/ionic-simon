import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

/**
 * EN: Class for execute some code before navigate to any route.
 * 
 * ES: Clase para ejecutar algún código antes de navegar a cualquier ruta.
 */
 @Injectable()
 export class RouteResolver implements Resolve<void> {
   /**
    * EN: Constructor for the resolver.
    * 
    * ES: Constructor para el resolver.
    * @param {TranslateService} translate EN: Service of Angular to manage the translations. / ES: Servicio de Angular para gestionar las traducciones.
    * @param {Router} router EN: Service of Angular to manage the application routes. / ES: Servicio de Angular para gestionar las rutas de la aplicación.
    */
   constructor(
     private readonly translate: TranslateService,
     private readonly router: Router
   ){}
 
   /**
    * EN: Checks if the language is defined before navigate.
    * 
    * ES: Comprueba si el idioma está definido antes de navegar.
    * 
    * @returns {void}
    */
   resolve(): void {
     if (this.translate.currentLang === undefined || Object.keys(this.translate.translations).length <= 0) {
       this.router.navigate(['/']);
     }
   }
 }