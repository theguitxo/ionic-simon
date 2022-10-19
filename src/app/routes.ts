import { Injectable } from '@angular/core';
import { Routes, Resolve, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class RouteResolver implements Resolve<void> {
  constructor(
    private readonly translate: TranslateService,
    private readonly router: Router
  ){}

  resolve(): void {
    if (this.translate.currentLang === undefined || Object.keys(this.translate.translations).length <= 0) {
      this.router.navigate(['/']);
    }
  }
}

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
