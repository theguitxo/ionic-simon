/**
 * EN: The type of language information that be used when the app saves the language information.
 * 
 * ES: El tipo de información de idioma que se utilizará cuando la aplicación guarde la información de idioma.
 */
export type languageTypeInfo = 'device' | 'user' | 'both';

/**
 * EN: Default time to show the toast (short message) in the bottom of the screen.
 * 
 * ES: Tiempo predeterminado para mostrar el brindis (mensaje corto) en la parte inferior de la pantalla.
 */
export const DEFAULT_TOAST_DURATION = 2000;

/**
 * EN: Default language for the app.
 * 
 * ES: Idioma predeterminado para la aplicación.
 */
export const DEFAULT_APP_LANGUAGE = 'es';

/**
 * EN: Key for the 'language' in some app actions.
 * 
 * ES: Clave para el 'idioma' en algunas acciones de la aplicación.
 */
export const APP_LANGUAGE_KEY = 'lang';

/**
 * EN: List of available languages
 * 
 * ES: Lista de idiomas disponibles
 */
export const AVAILABLE_LANGUAGES = ['es', 'en'];

/**
 * EN: Key for the 'players' in some app actions.
 * 
 * ES: Clave para los 'jugadores' en algunas acciones de la aplicación.
 */
export const APP_PLAYERS_KEY = 'players';

/**
 * EN: Key for the 'current player' in some app actions.
 * 
 * ES: Clave para el 'jugador actual' en algunas acciones de la aplicación.
 */
export const APP_CURRENT_PLAYER_KEY = 'current_player';

/**
 * EN: Key for the 'player avatars' in some app actions.
 * 
 * ES: Clave para los 'avatares de los jugadores' en algunas acciones de la aplicación.
 */
export const APP_PLAYERS_AVATARS_LIST = 'players_avatars_list';

/**
 * EN: Key for the 'scores' in some app actions.
 * 
 * ES: Clave para las 'puntuaciones' en algunas acciones de la aplicación.
 */
export const APP_SCORES_KEY = 'scores';
