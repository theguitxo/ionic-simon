import { getSelectors } from "@ngrx/router-store";

/**
 * EN: Selectors for the routing of the application.
 * 
 * selectCurrentRoute: select the current route
 * 
 * selectFragment: select the current route fragment
 * 
 * selectQueryParams: select the current route query params
 * 
 * selectQueryParam: factory function to select a query param
 * 
 * selectRouteParams: select the current route params
 * 
 * selectRouteParam: factory function to select a route param
 * 
 * selectRouteData: select the current route data
 * 
 * selectUrl: select the current url
 * 
 * selectTitle: Select the title if available
 * 
 * ES: Selectores para el enrutamiento de la aplicación.
 * 
 * selectCurrentRoute: selector para la ruta actual
 * 
 * selectFragment: selector para los fragmentos de la ruta
 * 
 * selectQueryParams: selector para los query params de la ruta
 * 
 * selectQueryParam: selector para obtener un query param de la ruta
 * 
 * selectRouteParams: selector para los parámetros de la ruta
 * 
 * selectRouteParam: selector para un parámetro de la ruta
 * 
 * selectRouteData: selector para los datos la ruta
 * 
 * selectUrl: selector para la url actual
 * 
 * selectTitle: selector para el titulo de la ruta, si está disponible
 */
export const {
  selectCurrentRoute,
  selectFragment,
  selectQueryParams,
  selectQueryParam,
  selectRouteParams,
  selectRouteParam,
  selectRouteData,
  selectUrl,
  selectTitle
} = getSelectors();
