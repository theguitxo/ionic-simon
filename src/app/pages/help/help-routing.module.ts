import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutPage } from './about/about.page';
import { HelpPage } from './help.page';
import { HowPlayPage } from './how-play/how-play.page';

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
        title: 'How to play'
      },
      {
        path: 'about',
        component: AboutPage,
        title: 'About'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpPageRoutingModule {}
