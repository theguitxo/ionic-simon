import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage-angular";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class StorageService {
  private _storage: Storage | null = null;

  public storageReady$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public get$: Subject<any> = new Subject();

  constructor(
    private readonly storage: Storage
  ) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    this.storageReady$.next(true);
    this.storageReady$.complete();
  }

  public async set(key: string, value: any) {
    await this._storage?.set(key, value);
  }

  public async get(key: string): Promise<any> {
    return this._storage?.get(key);
  }

  public async getObservable(key: string) {
    const value = await this._storage?.get(key);
    this.get$.next(value);
  }
}