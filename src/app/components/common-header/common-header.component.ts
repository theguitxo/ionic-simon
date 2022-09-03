import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectTitle } from "src/app/store/store.selectors";
import { StoreState } from "src/app/store/store.state";

@Component({
  selector: 'app-common-header',
  templateUrl: './common-header.component.html'
})
export class CommonHeaderComponent implements OnInit {
  title!: Observable<string>;
  
  constructor(
    private readonly store: Store<StoreState>
  ) {}
  
  ngOnInit(): void {
    this.title = this.store.select(selectTitle);
  }
}
