import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-players',
  templateUrl: './players.page.html',
  styleUrls: ['./players.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersPage {}
