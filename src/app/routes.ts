import { Routes } from '@angular/router';
import { RouteResolver } from './app.guards';

/**
 * EN: List of routes for the application.
 * 
 * ES: Lista de rutas para la aplicación.
 */
export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    resolve: { data: RouteResolver }
  },
  {
    path: 'help',
    loadChildren: () => import('./pages/help/help.module').then(m => m.HelpPageModule),
    resolve: { data: RouteResolver }
  },
  {
    path: 'players',
    loadChildren: () => import('./pages/players/players.module').then(m => m.PlayersPageModule),
    resolve: { data: RouteResolver }
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule),
    resolve: { data: RouteResolver }
  },
  {
    path: 'game',
    loadChildren: () => import('./pages/game/game.module').then(m => m.GamePageModule),
    resolve: { data: RouteResolver }
  },
  {
    path: 'scores',
    loadChildren: () => import('./pages/scores/scores.module').then(m => m.ScoresPageModule),
    resolve: { data: RouteResolver }
  }
];
