import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage-angular";
import { BehaviorSubject } from "rxjs";

/**
 * EN: Service to manage the information of the local storage.
 * 
 * ES: Servicio para gestionar la información del almacenamiento local.
 */
@Injectable({
  providedIn: "root"
})
export class StorageService {
  /**
   * EN: Reference to the local storage.
   * 
   * ES: Referencia al almacenamiento local.
   */
  private _storage: Storage | null = null;
  /**
   * EN: To control is local storage is ready.
   * 
   * ES: Para controlar si el almacenamiento local está listo.
   */
  public storageReady$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  /**
   * EN: Constructor for the service.
   * 
   * ES: Constructor para el servicio.
   * @param {StorageService} storageService EN: Service to manage the local storage. / ES: Servicio para gestionar el almacenamiento local. 
   */
  constructor(
    private readonly storage: Storage
  ) {
    this.init();
  }

  /**
   * EN: Inits the local storage and sends a signal when it is ready.
   * 
   * ES: Inicializa el almacenamiento local y envía una señal cuando está listo.
   */
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    this.storageReady$.next(true);
    this.storageReady$.complete();
  }

  /**
   * EN: Sets a value into the local storage.
   * 
   * ES: Establece un valor en el almacenamiento local.
   * @param {string} key EN: Key where it must save the value. / ES: Clave donde debe guardar el valor.
   * @param {any} value EN: Value to save. / ES: Valor a ahorrar.
   */
  public async set(key: string, value: any) {
    await this._storage?.set(key, value);
  }

  /**
   * EN: Gets a value from the local storage.
   * 
   * ES: Obtiene un valor del almacenamiento local.
   * @param {string} key EN: Key which he must gets their value. / ES: Clave de la que debe obtener su valor.
   * @returns {Promise<any>} EN: Value getting from the storage. / ES: Valor obtenido del almacenamiento.
   */
  public async get(key: string): Promise<any> {
    return this._storage?.get(key);
  }
}