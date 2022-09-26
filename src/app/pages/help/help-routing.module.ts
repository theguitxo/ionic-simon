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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpPageRoutingModule {}
