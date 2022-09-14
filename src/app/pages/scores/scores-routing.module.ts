import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ScoresPlayerPage } from "./scores.page";

const routes: Routes = [
  {
    path: '',
    component: ScoresPlayerPage,
    title: 'scores.scores'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScoresPageRoutingModule {}
