import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectTitle } from '../../store/store.selectors';
import { StoreState } from '../../store/store.state';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {

  constructor(
    private readonly store: Store<StoreState>
  ) {}

  ngOnInit(): void {
    this.store.select(selectTitle).subscribe((value) => console.log(value));
    console.log('on init');
  }

}
