import { Component, Input } from '@angular/core';
import * as SCORES_MODEL from "../../../models/scores/scores.models";

@Component({
  selector: 'app-scores-list',
  templateUrl: './scores-list.component.html',
  styleUrls: ['./scores-list.component.scss']
})
export class ScoresListComponent {
  @Input() playerTypeTitle: string;
  @Input() scoresList: SCORES_MODEL.ScoresListItem[];
}
