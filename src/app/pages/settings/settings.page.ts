import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ConfigLanguageItem } from "../../models/app.models";
import * as CONSTANTS from '../../models/app.constants';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPage implements OnInit {
  languagesInfo: ConfigLanguageItem[] = [];

  ngOnInit(): void {
    this.languagesInfo = CONSTANTS.AVAILABLE_LANGUAGES.map(item => ({
      code: item,
      name: '',
      selected: false
    }));

    console.log(this.languagesInfo);
  }
}
