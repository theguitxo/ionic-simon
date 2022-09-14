import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { newPlayer } from "../../../store/players/players.actions";
import { StoreState } from "../../../store/store.state";
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-new-player',
  templateUrl: './new-player.page.html',
  styleUrls: ['./new-player.page.scss']
})
export class NewPlayerPage implements OnInit {
  newPlayerForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly store: Store<StoreState>
  ) {}

  ngOnInit(): void {
    this.newPlayerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  createNewPlayer(): void {
    console.log('create new player');
    this.store.dispatch(newPlayer({ player: {
      id: uuidv4(),
      name: this.newPlayerForm.controls.name.value
    }}));
  }
}
