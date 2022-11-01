import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutPage } from './about/about.page';
import { HelpPage } from './help.page';
import { HowPlayPage } from './how-play/how-play.page';

/**
 * EN: Routes list for the help page.
 * 
 * ES: Lista de rutas para la página de ayuda.
 */
const routes: Routes = [
  {
    path: '',
    component: HelpPage,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'how-play'
      },
      {
        path: 'how-play',
        component: HowPlayPage,
        title: 'help.howToPlay.title'
      },
      {
        path: 'about',
        component: AboutPage,
        title: 'help.about.title'
      }
    ]
  }
];

/**
 * EN: Module for manage the routes of the help page.
 * 
 * ES: Módulo para gestionar las rutas de la página de ayuda.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpPageRoutingModule {}
