import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app/app.state";
import { v4 as uuidv4 } from 'uuid';
import * as APP_ACTIONS from "../../../store/players/players.actions";

/**
 * EN: Component for new player page.
 * 
 * ES: Componente para la página del nuevo jugador.
 */
@Component({
  selector: 'app-new-player',
  templateUrl: './new-player.page.html',
  styleUrls: ['./new-player.page.scss']
})
export class NewPlayerPage implements OnInit {
  /**
   * EN: Form for create a new player.
   * 
   * ES: Formulario para crear un nuevo jugador.
   */
  newPlayerForm!: FormGroup;
  /**
   * EN: List of avatars file paths.
   * 
   * ES: Lista de rutas de archivos de avatares.
   */
  avatarFiles: string[];
  /**
   * EN: Index in the list of the selected avatar.
   * 
   * ES: Índice en la lista del avatar seleccionado.
   */
  avatarSelected: number;

  /**
   * EN: Constructor for the class.
   * 
   * ES: Constructor de la clase.
   * @param {FormBuilder} formBuilder EN: Angular service for build data forms. / ES: Servicio angular para construir formularios de datos.
   * @param {Store<AppState>} store EN: Reference to the store (NgRx) of the app. / ES: Referencia a la store (NgRx) de la aplicación.
   */
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly store: Store<AppState>
  ) {}

  /**
   * EN: Builds the form for create a new player.
   * 
   * ES: Construye el formulario para crear un nuevo jugador.
   */
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

  /**
   * EN: Sets the index in the avatars list for a new player.
   * 
   * ES: Establece el índice en la lista de avatares para un nuevo jugador.
   * @param {number} index EN: Index of the avatar in the list. / ES: Índice del avatar en la lista.
   */
  selectAvatar(index: number): void {
    this.avatarSelected = index;
  }

  /**
   * EN: Dispatch the action to create a new player.
   * 
   * ES: Envía la acción para crear un nuevo jugador.
   */
  createNewPlayer(): void {
    this.store.dispatch(APP_ACTIONS.newPlayer({ player: {
      id: this.generateUUID(),
      name: this.newPlayerForm.controls.name.value,
      avatar: this.avatarSelected
    }}));
  }

  /**
   * EN: Returns a UUID value
   * 
   * ES: Retorna un valor UUID
   * @returns EN: string with the UUID for the new player / cadena con el UUID para el neuvo jugador
   */
  private generateUUID(): string {
    return uuidv4();
  }
}
