import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "../../store/app/app.state";
import * as ROUTER_SELECTORS from "../../store/router.selectors";

@Component({
  selector: 'app-common-header',
  templateUrl: './common-header.component.html'
})
export class CommonHeaderComponent implements OnInit {
  title!: Observable<string>;
  
  constructor(
    private readonly store: Store<AppState>
  ) {}
  
  ngOnInit(): void {
    this.title = this.store.select(ROUTER_SELECTORS.selectTitle);
  }
}
