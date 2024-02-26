import { Component } from '@angular/core';
import { BackgroundService } from './service/background.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SnapSky';
  public backgroundService: BackgroundService;

  constructor(private _backgroundService: BackgroundService) {
    this.backgroundService = _backgroundService;
    this.backgroundService.updateBackgroundImage('url(./assets/img/temp.jpg)');
  }
}
