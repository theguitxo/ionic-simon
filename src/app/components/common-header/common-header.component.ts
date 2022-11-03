import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "../../store/app/app.state";
import * as ROUTER_SELECTORS from "../../store/router.selectors";

/**
 * EN: Component for the header used in all the pages.
 * 
 * ES: Componente para el encabezado utilizado en todas las páginas.
 */
@Component({
  selector: 'app-common-header',
  templateUrl: './common-header.component.html'
})
export class CommonHeaderComponent implements OnInit {
  /**
   * EN: Observable to get the title from the route.
   * 
   * ES: Observable para obtener el título de la ruta.
   */
  title!: Observable<string>;
  
  /**
   * EN: Constructor for the component
   * 
   * ES: Constructor para el componente
   * @param {Store<AppState>} store EN: Reference to the store (NgRx) of the app. / ES: Referencia a la store (NgRx) de la aplicación.
   */
  constructor(
    private readonly store: Store<AppState>
  ) {}

  /**
   * EN: Angular lifecycle: sets the property to get the title of the page.
   * 
   * ES: Ciclo de vida angular: establece la propiedad para obtener el título de la página.
   */
  ngOnInit(): void {
    this.title = this.store.select(ROUTER_SELECTORS.selectTitle);
  }
}
