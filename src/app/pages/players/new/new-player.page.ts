import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app/app.state";
import { v4 as uuidv4 } from 'uuid';
import * as APP_ACTIONS from "../../../store/players/players.actions";

@Component({
  selector: 'app-new-player',
  templateUrl: './new-player.page.html',
  styleUrls: ['./new-player.page.scss']
})
export class NewPlayerPage implements OnInit {
  newPlayerForm!: FormGroup;
  avatarFiles: string[];
  avatarSelected: number;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.newPlayerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });

    this.avatarFiles = new Array(16).fill('').map((_i, index) => {
      const fileNumber = `0${index + 1}`.slice(-2);
      return `/assets/avatar/avatar_${fileNumber}.svg`;
    });

    this.avatarSelected = 1;
  }

  selectAvatar(index: number): void {
    this.avatarSelected = index;
  }

  createNewPlayer(): void {
    this.store.dispatch(APP_ACTIONS.newPlayer({ player: {
      id: uuidv4(),
      name: this.newPlayerForm.controls.name.value,
      avatar: this.avatarSelected
    }}));
  }
}
