import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ScoresPage } from "./scores.page";

const routes: Routes = [
  {
    path: '',
    component: ScoresPage,
    title: 'scores.scores'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScoresPageRoutingModule {}
